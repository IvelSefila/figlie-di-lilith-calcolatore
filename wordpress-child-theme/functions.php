<?php
/**
 * Figlie di Lilith - Functions & Setup
 *
 * @package FiglieDiLilith
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! function_exists( 'figlie_di_lilith_setup' ) ) {
    function figlie_di_lilith_setup() {
        add_theme_support( 'title-tag' );
        add_theme_support( 'post-thumbnails' );
        add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
    }
}
add_action( 'after_setup_theme', 'figlie_di_lilith_setup' );

if ( ! function_exists( 'figlie_di_lilith_enqueue_calculator_assets' ) ) {
    function figlie_di_lilith_enqueue_calculator_assets() {
        if ( file_exists( get_stylesheet_directory() . '/css/calcolatore-lilith.css' ) ) {
            wp_enqueue_style(
                'lilith-calcolatore-css',
                get_stylesheet_directory_uri() . '/css/calcolatore-lilith.css',
                array(),
                '2.2.0'
            );
        }

        if ( file_exists( get_stylesheet_directory() . '/js/calcolatore-aspects-dict.js' ) ) {
            wp_enqueue_script(
                'lilith-calcolatore-aspects-dict-js',
                get_stylesheet_directory_uri() . '/js/calcolatore-aspects-dict.js',
                array(),
                '2.3.0',
                true
            );
        }

        if ( file_exists( get_stylesheet_directory() . '/js/calcolatore-corpi-dict.js' ) ) {
            wp_enqueue_script(
                'lilith-calcolatore-corpi-dict-js',
                get_stylesheet_directory_uri() . '/js/calcolatore-corpi-dict.js',
                array(),
                '4.1.0',
                true
            );
        }

        if ( file_exists( get_stylesheet_directory() . '/js/calcolatore-chart.js' ) ) {
            wp_enqueue_script(
                'lilith-calcolatore-chart-js',
                get_stylesheet_directory_uri() . '/js/calcolatore-chart.js',
                array(),
                '2.3.0',
                true
            );
        }

        if ( file_exists( get_stylesheet_directory() . '/js/calcolatore-engine.js' ) ) {
            wp_enqueue_script(
                'lilith-calcolatore-engine-js',
                get_stylesheet_directory_uri() . '/js/calcolatore-engine.js',
                array( 'lilith-calcolatore-aspects-dict-js', 'lilith-calcolatore-corpi-dict-js' ),
                '3.1.0',
                true
            );
        }

        if ( file_exists( get_stylesheet_directory() . '/js/calcolatore-app.js' ) ) {
            wp_enqueue_script(
                'lilith-calcolatore-app-js',
                get_stylesheet_directory_uri() . '/js/calcolatore-app.js',
                array( 'lilith-calcolatore-chart-js', 'lilith-calcolatore-engine-js', 'lilith-calcolatore-aspects-dict-js' ),
                '4.0.0',
                true
            );
        }

        // Ponte Swiss Ephemeris: modulo ES, caricato con type="module".
        if ( file_exists( get_stylesheet_directory() . '/js/calcolatore-swiss.mjs' ) ) {
            wp_enqueue_script(
                'lilith-calcolatore-swiss-mjs',
                get_stylesheet_directory_uri() . '/js/calcolatore-swiss.mjs',
                array( 'lilith-calcolatore-engine-js' ),
                '4.0.0',
                true
            );
        }
    }
}

/**
 * I moduli ES vanno serviti con type="module", altrimenti il browser
 * rifiuta le istruzioni import di calcolatore-swiss.mjs.
 */
if ( ! function_exists( 'figlie_di_lilith_module_script_tag' ) ) {
    function figlie_di_lilith_module_script_tag( $tag, $handle, $src ) {
        if ( 'lilith-calcolatore-swiss-mjs' === $handle ) {
            return '<script type="module" src="' . esc_url( $src ) . '" id="' . esc_attr( $handle ) . '-js"></script>' . "\n";
        }
        return $tag;
    }
}
add_filter( 'script_loader_tag', 'figlie_di_lilith_module_script_tag', 10, 3 );

/**
 * Il calcolatore pesa diverse centinaia di KB fra motore, dizionari e WASM:
 * va caricato solo dove è effettivamente presente.
 */
if ( ! function_exists( 'figlie_di_lilith_needs_calculator_assets' ) ) {
    function figlie_di_lilith_needs_calculator_assets() {
        // Tutti i template che includono template-parts/calcolatore-markup.php.
        if ( is_page_template( array( 'page-calcolatore.php', 'page-tema-natale.php', 'page-portale-completo.php', 'page-grimorio.php' ) ) ) {
            return true;
        }
        $post = get_post();
        if ( $post instanceof WP_Post && has_shortcode( $post->post_content, 'calcolatore_tema_natale' ) ) {
            return true;
        }
        return false;
    }
}

if ( ! function_exists( 'figlie_di_lilith_enqueue_assets' ) ) {
    function figlie_di_lilith_enqueue_assets() {
        // Google Fonts Ufficiali
        wp_enqueue_style(
            'lilith-google-fonts',
            'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap',
            array(),
            null
        );

        // CSS Principale
        wp_enqueue_style(
            'figlie-di-lilith-style',
            get_stylesheet_uri(),
            array(),
            '2.1.0'
        );

        // JS Data & App
        if ( file_exists( get_stylesheet_directory() . '/js/data.js' ) ) {
            wp_enqueue_script(
                'figlie-di-lilith-data',
                get_stylesheet_directory_uri() . '/js/data.js',
                array(),
                '2.1.0',
                true
            );
        }

        if ( file_exists( get_stylesheet_directory() . '/js/app.js' ) ) {
            wp_enqueue_script(
                'figlie-di-lilith-app',
                get_stylesheet_directory_uri() . '/js/app.js',
                array( 'figlie-di-lilith-data' ),
                '2.1.0',
                true
            );
        }

        if ( figlie_di_lilith_needs_calculator_assets() ) {
            figlie_di_lilith_enqueue_calculator_assets();
        }
    }
}
add_action( 'wp_enqueue_scripts', 'figlie_di_lilith_enqueue_assets' );

if ( ! function_exists( 'lilith_shortcode_pulsante_grimorio' ) ) {
    function lilith_shortcode_pulsante_grimorio( $atts ) {
        $a = shortcode_atts( array(
            'testo' => 'Accedi ai 9 Capitoli della Bibbia di Lilith ⚸',
            'url'   => home_url( '/grimorio/' ),
        ), $atts );

        return sprintf(
            '<div style="text-align:center; margin: 2rem 0;">
                <a href="%s" class="pulsante-bagliore" style="display:inline-flex; align-items:center; gap:0.6rem; padding:0.95rem 1.8rem; border-radius:999px; border:1px solid rgba(255,90,31,0.62); color:#fff; background:linear-gradient(135deg, #690000, #bd1b1b 48%, #5b0505); box-shadow:0 0 24px rgba(139,0,0,0.56); text-decoration:none; font-weight:800; text-transform:uppercase; font-size:0.82rem; letter-spacing:0.12em;">
                    %s
                </a>
            </div>',
            esc_url( $a['url'] ),
            esc_html( $a['testo'] )
        );
    }
}
if ( ! shortcode_exists( 'pulsante_grimorio' ) ) {
    add_shortcode( 'pulsante_grimorio', 'lilith_shortcode_pulsante_grimorio' );
}

if ( ! function_exists( 'lilith_shortcode_calcolatore_tema_natale' ) ) {
    function lilith_shortcode_calcolatore_tema_natale( $atts ) {
        figlie_di_lilith_enqueue_calculator_assets();

        $markup_file = get_stylesheet_directory() . '/template-parts/calcolatore-markup.php';
        if ( file_exists( $markup_file ) ) {
            ob_start();
            include $markup_file;
            return ob_get_clean();
        }

        return '<p style="color:#c7a56b; text-align:center;">⚸ Calcolatore Tema Natale non disponibile.</p>';
    }
}
if ( ! shortcode_exists( 'calcolatore_tema_natale' ) ) {
    add_shortcode( 'calcolatore_tema_natale', 'lilith_shortcode_calcolatore_tema_natale' );
}

if ( ! function_exists( 'lilith_child_theme_body_classes' ) ) {
    function lilith_child_theme_body_classes( $classes ) {
        if ( is_page_template( 'page-homepage-personale.php' ) || 
             is_page_template( 'page-grimorio.php' ) || 
             is_page_template( 'page-portale-completo.php' ) ||
             is_page_template( 'page-tema-natale.php' ) ||
             is_page_template( 'page-calcolatore.php' ) ) {
            $classes[] = 'figlie-di-lilith-theme';
            $classes[] = 'oled-dark-mode';
        }
        return $classes;
    }
}
add_filter( 'body_class', 'lilith_child_theme_body_classes' );

if ( ! function_exists( 'figlie_di_lilith_disable_admin_bar_mobile' ) ) {
    function figlie_di_lilith_disable_admin_bar_mobile( $show ) {
        if ( ! is_admin() && wp_is_mobile() ) {
            return false;
        }
        return $show;
    }
}
add_filter( 'show_admin_bar', 'figlie_di_lilith_disable_admin_bar_mobile' );
