<?php
/*
Template Name: Calcolatore Tema Natale - Figlie di Lilith
*/
$lilith_home_url = esc_url( home_url( '/' ) );
$lilith_grimorio_url = esc_url( home_url( '/grimorio/' ) );
$lilith_calcolatore_url = esc_url( home_url( '/calcolatore/' ) );
$lilith_title = 'Calcolatore Dedicato Tema Natale | Figlie di Lilith - Effemeridi Svizzere & Orientamento Strutturale';
$lilith_page_description = 'Pagina interamente dedicata al Calcolatore del Tema Natale con le Effemeridi Svizzere ad altissima precisione, cuspidi Placidus, Luna Nera Lilith ⚸ e analisi operativa a 7 punti. Architettura Zero-Database e massima riservatezza.';
$lilith_hero_image = function_exists('get_stylesheet_directory_uri') ? esc_url( get_stylesheet_directory_uri() . '/sigillo-lilith-oro-nero.png' ) : 'sigillo-lilith-oro-nero.png';
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
<title><?php echo esc_html( $lilith_title ); ?></title>
<meta name="description" content="<?php echo esc_attr( $lilith_page_description ); ?>">
<meta name="keywords" content="tema natale, calcolatore tema natale, effemeridi svizzere, lilith, luna nera, swiss ephemeris, figlie di lilith, lilith pontifex, placidus, astrologia esoterica">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#050505">
<link rel="canonical" href="<?php echo esc_url( get_permalink() ); ?>">

<!-- Open Graph / Social -->
<meta property="og:type" content="website">
<meta property="og:locale" content="it_IT">
<meta property="og:site_name" content="Figlie di Lilith">
<meta property="og:title" content="<?php echo esc_attr( $lilith_title ); ?>">
<meta property="og:description" content="<?php echo esc_attr( $lilith_page_description ); ?>">
<meta property="og:url" content="<?php echo esc_url( get_permalink() ); ?>">
<meta property="og:image" content="<?php echo esc_url( $lilith_hero_image ); ?>">

<!-- Google Fonts Ufficiali -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap">

<!-- Schema.org JSON-LD (Lilith Pontifex: UOMO, Autore e Custode del Cerchio) -->
<script type="application/ld+json">
<?php
echo wp_json_encode(
  array(
    '@context' => 'https://schema.org',
    '@graph' => array(
      array(
        '@type' => 'WebSite',
        '@id' => $lilith_home_url . '#website',
        'url' => $lilith_home_url,
        'name' => 'Figlie di Lilith',
        'description' => $lilith_page_description,
        'inLanguage' => 'it-IT',
        'publisher' => array( '@id' => $lilith_home_url . '#organization' ),
      ),
      array(
        '@type' => 'Organization',
        '@id' => $lilith_home_url . '#organization',
        'name' => 'Figlie di Lilith',
        'alternateName' => array( 'il Cerchio Lilithiano', 'Cerchio Lilithiano' ),
        'url' => $lilith_home_url,
        'email' => 'info@figliedililith.it',
        'founder' => array( '@id' => $lilith_home_url . '#person-lilith-pontifex' ),
      ),
      array(
        '@type' => 'Person',
        '@id' => $lilith_home_url . '#person-lilith-pontifex',
        'name' => 'Lilith Pontifex',
        'gender' => 'Male',
        'url' => $lilith_home_url,
        'jobTitle' => 'Custode del Cerchio, Autore ed Esperto di Esoterismo',
        'description' => 'Custode del cerchio lilithiano, autore ed esperto sul mito della prima donna (Lilitu) e promotore dell'emancipazione spirituale e della via lilithiana.',
        'worksFor' => array( '@id' => $lilith_home_url . '#organization' ),
        'sameAs' => array(
          'https://www.instagram.com/lilithpontifex/',
          'https://www.youtube.com/@LilithPontifex',
          'https://www.tiktok.com/@lilith.pontifex'
        ),
      ),
      array(
        '@type' => 'WebApplication',
        '@id' => $lilith_home_url . '#calcolatore-dedicato',
        'name' => 'Calcolatore Tema Natale Dedicato - Figlie di Lilith',
        'url' => get_permalink(),
        'applicationCategory' => 'EducationalApplication',
        'operatingSystem' => 'All',
        'description' => 'Pagina dedicata al calcolatore astronomico ed esoterico per la stesura del Tema Natale su Swiss Ephemeris e orientamento a 7 punti.',
      )
    ),
  ),
  JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
);
?>
</script>

<!-- Stili Child Theme & Calcolatore Lilith -->
<link rel="stylesheet" href="<?php echo esc_url( get_stylesheet_uri() . '?v=2.3.0' ); ?>">
<link rel="stylesheet" href="<?php echo esc_url( get_stylesheet_directory_uri() . '/css/calcolatore-lilith.css?v=2.3.0' ); ?>">

<style>
  :root {
    --bg-oled: hsl(0, 0%, 2%);
    --bg-dark-base: #0a0606;
    --rosso: #8b0000;
    --rosso-vivo: #c31818;
    --fiamma: #ff5a1f;
    --oro-velato: #c7a56b;
    --gold-primary: #c7a56b;
    --gold-light: #fff2cc;
    --gold-dark: #8c6d37;
    --bianco: #fff7ef;
    --muted: rgba(255, 247, 239, 0.74);
    --border: rgba(195, 24, 24, 0.34);
    --max: 1240px;
    --font-display: 'Cormorant Garamond', Georgia, serif;
    --font-sans: 'Inter', system-ui, sans-serif;
  }

  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 0;
    font-family: var(--font-sans);
    color: var(--bianco);
    background-color: var(--bg-oled);
    background-image: radial-gradient(circle at 50% 50%, rgba(20, 10, 10, 0.4) 0%, var(--bg-oled) 80%);
    background-attachment: fixed;
    line-height: 1.75;
    overflow-x: hidden;
    position: relative;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }

  body.drawer-open {
    overflow: hidden !important;
    touch-action: none !important;
  }

  .noise-overlay {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.035;
    pointer-events: none;
    z-index: 0;
  }

  .site-watermark {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: min(72vw, 680px);
    height: auto;
    opacity: 0.023;
    pointer-events: none;
    user-select: none;
    z-index: 0;
  }

  a { color: inherit; text-decoration: none; }

  @media screen and (max-width: 992px) {
    #wpadminbar { display: none !important; height: 0 !important; min-height: 0 !important; visibility: hidden !important; pointer-events: none !important; }
    html, body { margin-top: 0 !important; padding-top: 0 !important; }
    .admin-bar .site-header-portal, .admin-bar .site-header { top: 0 !important; }
  }
  @media screen and (min-width: 993px) {
    .admin-bar .site-header-portal, .admin-bar .site-header { top: 32px !important; }
  }

  /* Header & Barra di Navigazione Sticky */
  .site-header-portal {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(8, 6, 6, 0.94);
    backdrop-filter: blur(24px) saturate(140%);
    -webkit-backdrop-filter: blur(24px) saturate(140%);
    border-bottom: 1px solid rgba(195, 24, 24, 0.34);
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.92);
  }

  .nav-container {
    max-width: var(--max);
    margin: 0 auto;
    padding: 0.85rem 1.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
  }

  .brand-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .brand-sigil {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: 1px solid rgba(199, 165, 107, 0.42);
    border-radius: 999px;
    background: linear-gradient(145deg, rgba(10,10,10,0.76), rgba(80,0,0,0.24));
    color: var(--oro-velato);
    font-size: 1.6rem;
    box-shadow: 0 0 20px rgba(139, 0, 0, 0.4);
    transition: transform 0.3s ease;
    flex-shrink: 0;
  }
  .brand-wrapper:hover .brand-sigil {
    transform: scale(1.06);
  }

  .brand-text h1 {
    font-family: var(--font-display);
    font-size: 1.25rem;
    letter-spacing: 1.2px;
    margin: 0;
    color: #fff;
    text-transform: uppercase;
    font-weight: 700;
    line-height: 1.1;
  }
  .brand-text p {
    font-family: var(--font-sans);
    font-size: 0.68rem;
    letter-spacing: 1.2px;
    margin: 0;
    color: var(--oro-velato);
    text-transform: uppercase;
  }

  .portal-nav-links {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }
  .nav-link {
    font-size: 0.84rem;
    color: var(--muted);
    font-weight: 500;
    letter-spacing: 0.5px;
    transition: color 0.3s ease;
    padding: 0.3rem 0;
  }
  .nav-link:hover, .nav-link.active {
    color: #fff;
  }
  .nav-link.active {
    color: var(--oro-velato);
    font-weight: 600;
  }
  .nav-link.nav-link-highlight {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 1.1rem;
    border-radius: 999px;
    background: linear-gradient(135deg, rgba(139,0,0,0.35), rgba(20,10,10,0.7));
    border: 1px solid rgba(199, 165, 107, 0.45);
    color: var(--oro-velato);
    font-weight: 600;
  }
  .nav-link.nav-link-highlight:hover {
    border-color: var(--fiamma);
    color: #fff;
    box-shadow: 0 0 16px rgba(195,24,24,0.5);
  }

  /* Hamburger Menu Button */
  .hamburger-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    border: 1px solid rgba(199, 165, 107, 0.42);
    border-radius: 999px;
    background: linear-gradient(145deg, rgba(10,10,10,0.76), rgba(80,0,0,0.24));
    color: var(--bianco);
    box-shadow: 0 10px 30px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.09);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    padding: 0.5rem 1.15rem;
    cursor: pointer;
    touch-action: manipulation;
    user-select: none;
    min-height: 44px;
    transition: all 0.25s ease;
    flex-shrink: 0;
  }
  .hamburger-btn:hover {
    border-color: rgba(255, 90, 31, 0.74);
    box-shadow: 0 0 30px rgba(195, 24, 24, 0.55);
    transform: translateY(-1px);
  }
  .hamburger-label {
    font-family: var(--font-sans);
    font-size: 0.74rem;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-weight: 600;
    color: #fff2cc;
    line-height: 1;
  }
  .hamburger-box {
    width: 20px;
    height: 14px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .hamburger-line {
    display: block;
    width: 100%;
    height: 2px;
    background: #e5c365;
    border-radius: 2px;
    box-shadow: 0 0 6px rgba(199, 165, 107, 0.5);
    transition: transform 0.3s ease, opacity 0.2s ease;
  }
  .hamburger-btn.is-active .hamburger-line.line-1 {
    transform: translateY(6px) rotate(45deg);
  }
  .hamburger-btn.is-active .hamburger-line.line-2 {
    opacity: 0;
  }
  .hamburger-btn.is-active .hamburger-line.line-3 {
    transform: translateY(-6px) rotate(-45deg);
  }

  @media screen and (max-width: 900px) {
    .portal-nav-links { display: none; }
  }

  /* Off-Canvas Drawer (Stile Gotico Oro & Nero) */
  .drawer-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(6, 4, 4, 0.82);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    z-index: 998;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .drawer-backdrop.is-open {
    opacity: 1;
    pointer-events: auto;
  }
  .grimoire-drawer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(400px, 88vw);
    height: 100vh;
    height: 100dvh;
    background: linear-gradient(180deg, rgba(12, 8, 8, 0.98) 0%, rgba(8, 6, 13, 0.98) 100%);
    backdrop-filter: blur(32px) saturate(180%);
    -webkit-backdrop-filter: blur(32px) saturate(180%);
    border-left: 1px solid rgba(199, 165, 107, 0.3);
    box-shadow: -15px 0 50px rgba(0, 0, 0, 0.92);
    z-index: 999;
    transform: translateX(105%);
    transition: transform 0.42s cubic-bezier(0.16, 1, 0.3, 1);
    overflow-y: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    padding: 1.5rem 1.35rem 2rem;
    box-sizing: border-box;
  }
  .grimoire-drawer.is-open {
    transform: translateX(0);
  }
  .drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1.15rem;
    border-bottom: 1px solid rgba(199, 165, 107, 0.2);
    margin-bottom: 1.25rem;
  }
  .drawer-brand {
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }
  .drawer-sigil {
    font-size: 2.2rem;
    color: var(--gold-primary);
    line-height: 1;
  }
  .drawer-title {
    font-family: var(--font-display);
    font-size: 1.25rem;
    letter-spacing: 1.2px;
    color: var(--gold-light);
    margin: 0;
    line-height: 1.2;
    text-transform: uppercase;
    font-weight: 700;
  }
  .drawer-subtitle {
    font-family: var(--font-sans);
    font-size: 0.68rem;
    letter-spacing: 1px;
    color: var(--muted);
    text-transform: uppercase;
  }
  .drawer-close-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(199, 165, 107, 0.08);
    border: 1px solid rgba(199, 165, 107, 0.25);
    color: var(--gold-light);
    font-size: 1.15rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.25s ease;
  }
  .drawer-close-btn:hover {
    background: rgba(195, 24, 24, 0.25);
    border-color: var(--rosso-vivo);
    color: #fff;
    transform: rotate(90deg);
  }
  .drawer-category-heading {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin: 1.2rem 0 0.8rem;
    font-size: 0.72rem;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .drawer-cat-badge {
    color: var(--oro-velato);
    font-weight: 700;
  }
  .drawer-cat-text {
    color: var(--muted);
  }
  .drawer-portal-nav-list, .drawer-tomes-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }
  .drawer-portal-link, .drawer-tome-link {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 0.75rem 0.9rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(199, 165, 107, 0.12);
    border-radius: 8px;
    text-decoration: none;
    color: var(--bianco);
    transition: all 0.25s ease;
    min-height: 50px;
    box-sizing: border-box;
  }
  .drawer-portal-link:hover, .drawer-portal-link.active,
  .drawer-tome-link:hover, .drawer-tome-link.active {
    background: rgba(199, 165, 107, 0.1);
    border-color: var(--gold-primary);
    transform: translateX(4px);
  }
  .drawer-portal-link.active, .drawer-tome-link.active {
    border-left: 3px solid var(--gold-primary);
  }
  .drawer-portal-glyph, .drawer-tome-glyph {
    font-size: 1.35rem;
    color: var(--gold-primary);
    width: 26px;
    text-align: center;
    flex-shrink: 0;
  }
  .drawer-tome-info {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    flex-grow: 1;
    min-width: 0;
  }
  .drawer-tome-num {
    font-size: 0.65rem;
    letter-spacing: 1.2px;
    color: var(--gold-dark);
    text-transform: uppercase;
    font-weight: 600;
  }
  .drawer-tome-name {
    font-family: var(--font-display);
    font-size: 0.95rem;
    color: var(--gold-light);
    line-height: 1.25;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .drawer-tome-sub {
    font-size: 0.75rem;
    color: var(--muted);
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .drawer-chevron {
    font-size: 1.3rem;
    color: var(--gold-dark);
    flex-shrink: 0;
  }
  .drawer-footer {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(199, 165, 107, 0.15);
    text-align: center;
  }
  .drawer-footer-invocation {
    font-family: var(--font-display);
    font-size: 0.82rem;
    letter-spacing: 1.5px;
    color: var(--oro-velato);
    text-transform: uppercase;
    font-weight: 600;
  }
  .drawer-footer-motto {
    font-family: var(--font-display);
    font-size: 1.05rem;
    color: var(--gold-primary);
    margin: 0.2rem 0;
  }
  .drawer-footer-sub {
    font-size: 0.76rem;
    color: var(--muted);
    margin-bottom: 1rem;
  }
  .drawer-top-btn {
    display: inline-flex;
    padding: 0.5rem 1rem;
    background: rgba(199, 165, 107, 0.08);
    border: 1px solid rgba(199, 165, 107, 0.25);
    border-radius: 6px;
    color: var(--gold-light);
    font-size: 0.8rem;
    letter-spacing: 1px;
  }

  /* Floating Portal Dock (Navigatore Rapido Inferiore) */
  .floating-portal-dock {
    position: fixed;
    bottom: 1.25rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 95;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 1.15rem;
    border-radius: 999px;
    background: rgba(10, 8, 8, 0.92);
    border: 1px solid rgba(199, 165, 107, 0.42);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.88), 0 0 25px rgba(139, 0, 0, 0.35);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
    user-select: none;
    box-sizing: border-box;
  }
  .dock-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--font-sans);
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    transition: all 0.25s ease;
    padding: 0.3rem 0.65rem;
    border-radius: 999px;
  }
  .dock-link:hover, .dock-link.active {
    color: #fff;
    background: rgba(139, 0, 0, 0.35);
  }
  .dock-link.dock-highlight {
    color: var(--oro-velato);
    border: 1px solid rgba(199, 165, 107, 0.35);
    background: rgba(80, 0, 0, 0.25);
    cursor: pointer;
  }
  .dock-link.dock-highlight:hover, .dock-link.dock-highlight.active {
    color: #fff;
    border-color: var(--fiamma);
    background: linear-gradient(135deg, #690000, #bd1b1b);
    box-shadow: 0 0 14px rgba(195, 24, 24, 0.55);
  }
  .dock-sep {
    color: rgba(199, 165, 107, 0.35);
    font-size: 0.8rem;
  }
  .dock-menu-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(199, 165, 107, 0.3);
    color: var(--oro-velato);
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.25s ease;
  }
  .dock-menu-btn:hover {
    border-color: var(--fiamma);
    color: #fff;
    transform: scale(1.1);
  }
  @media (max-width: 480px) {
    .floating-portal-dock {
      bottom: 0.85rem;
      padding: 0.35rem 0.75rem;
      gap: 0.4rem;
    }
    .dock-link {
      font-size: 0.7rem;
      padding: 0.25rem 0.4rem;
    }
  }

  /* Popover Verticale dei 9 Tomi dal Dock */
  .dock-tomes-popover {
    position: fixed;
    bottom: 5.2rem;
    left: 50%;
    transform: translateX(-50%) translateY(20px) scale(0.95);
    width: min(340px, 90vw);
    max-height: 65vh;
    background: rgba(12, 8, 8, 0.96);
    backdrop-filter: blur(28px);
    -webkit-backdrop-filter: blur(28px);
    border: 1px solid rgba(199, 165, 107, 0.4);
    border-radius: 16px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.95), 0 0 30px rgba(139, 0, 0, 0.4);
    z-index: 99;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .dock-tomes-popover.is-open {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(-50%) translateY(0) scale(1);
  }
  .dock-popover-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.85rem 1.1rem;
    border-bottom: 1px solid rgba(199, 165, 107, 0.2);
    font-family: var(--font-display);
    font-size: 1.05rem;
    color: var(--oro-velato);
    font-weight: 700;
  }
  .dock-popover-close {
    background: none;
    border: none;
    color: var(--muted);
    font-size: 1.3rem;
    cursor: pointer;
    line-height: 1;
  }
  .dock-popover-list {
    overflow-y: auto;
    padding: 0.6rem 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  .dock-popover-item {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.55rem 0.8rem;
    border-radius: 6px;
    font-size: 0.82rem;
    color: var(--bianco);
    transition: all 0.2s ease;
  }
  .dock-popover-item:hover {
    background: rgba(199, 165, 107, 0.12);
    color: #fff;
    transform: translateX(3px);
  }
  .dock-popover-item .tome-roman {
    color: var(--oro-velato);
    font-weight: 700;
    font-family: var(--font-display);
  }

  /* Dedicated Page Header Banner */
  .dedicated-hero-banner {
    max-width: var(--max);
    margin: 2.5rem auto 1.5rem;
    padding: 0 1.5rem;
    text-align: center;
  }
  .dedicated-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.45rem 1.25rem;
    border-radius: 999px;
    border: 1px solid rgba(199, 165, 107, 0.45);
    background: linear-gradient(135deg, rgba(80,0,0,0.4), rgba(20,10,10,0.8));
    color: var(--oro-velato);
    font-size: 0.76rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 1.2rem;
    box-shadow: 0 0 20px rgba(139,0,0,0.3);
  }
  .dedicated-page-title {
    font-family: var(--font-display);
    font-size: clamp(2.2rem, 4.5vw, 3.4rem);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin: 0 0 0.8rem;
    background: linear-gradient(135deg, #fff2cc 0%, #e5c365 40%, #b89033 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 2px 20px rgba(0, 0, 0, 0.8));
    line-height: 1.15;
  }
  .dedicated-page-desc {
    font-size: 1.05rem;
    color: var(--muted);
    max-width: 780px;
    margin: 0 auto 1.8rem;
    line-height: 1.8;
  }

  /* Footer Originale Canonico */
  .footer-originale-sito {
    background: #030202;
    border-top: 1px solid rgba(195, 24, 24, 0.4);
    padding: 3.5rem 1.5rem 2.5rem;
    position: relative;
    z-index: 10;
    margin-top: 5rem;
  }

  .footer-solemn-invocation-block {
    text-align: center;
    margin-bottom: 2rem;
  }

  .footer-sigil-icon {
    font-size: 2.2rem;
    color: var(--oro-velato);
    margin-bottom: 0.5rem;
  }

  .footer-invocation-solemn {
    font-family: var(--font-display);
    font-size: 1.35rem;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 0.3rem;
  }

  .footer-motto-solemn {
    font-family: var(--font-display);
    font-size: 1.7rem;
    font-weight: 700;
    font-style: italic;
    color: var(--fiamma);
    letter-spacing: 0.05em;
    margin-bottom: 0.4rem;
    text-shadow: 0 0 18px rgba(255, 90, 31, 0.4);
  }

  .footer-subtext {
    font-size: 0.85rem;
    color: var(--muted);
  }

  .footer-divider-ornate {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    max-width: 480px;
    margin: 1.5rem auto 2rem;
  }

  .divider-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(195, 24, 24, 0.4), transparent);
  }

  .divider-glyph {
    color: var(--oro-velato);
    font-size: 0.95rem;
  }

  .footer-social-links a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid rgba(195, 24, 24, 0.35);
    background: rgba(14, 10, 10, 0.8);
    transition: all 0.2s ease;
  }

  .footer-social-links a:hover {
    border-color: var(--fiamma);
    transform: translateY(-2px);
    box-shadow: 0 0 12px rgba(195, 24, 24, 0.5);
  }
</style>

<?php wp_head(); ?>
</head>
<body <?php body_class( array( 'figlie-di-lilith-theme', 'oled-dark-mode', 'page-calcolatore-dedicata' ) ); ?>>

  <!-- Texture & Watermark -->
  <div class="noise-overlay" aria-hidden="true"></div>
  <img src="<?php echo esc_url( $lilith_hero_image ); ?>" class="site-watermark" alt="" aria-hidden="true">

  <!-- ==========================================================================
       HEADER & NAVIGAZIONE DEL PORTALE (Sincronizzato col Canone 2026)
       ========================================================================== -->
  <header class="site-header site-header-portal">
    <div class="nav-container">
      <a href="<?php echo $lilith_home_url; ?>" class="brand-wrapper" aria-label="Torna alla Home di Figlie di Lilith">
        <span class="brand-sigil" aria-hidden="true">⚸</span>
        <div class="brand-text">
          <h1>Figlie di Lilith</h1>
          <p>Pagina dedicata alle Figlie di Lilith - Grimorio Lilithiano e Astrologico</p>
        </div>
      </a>

      <nav class="portal-nav-links" aria-label="Navigazione Principale">
        <a href="<?php echo $lilith_home_url; ?>" class="nav-link">Home</a>
        <a href="<?php echo $lilith_home_url; ?>#lilith-pontifex" class="nav-link">Lilith Pontifex</a>
        <a href="<?php echo $lilith_home_url; ?>#pilastri-cerchio" class="nav-link">I 4 Pilastri</a>
        <a href="<?php echo $lilith_grimorio_url; ?>" class="nav-link">Grimorio (9 Tomi)</a>
        <a href="#calcolatore-root" class="nav-link active">Calcolatore ⚸</a>
        <a href="<?php echo $lilith_home_url; ?>#contatti" class="nav-link">Contatti</a>
        <a href="<?php echo $lilith_grimorio_url; ?>" class="nav-link nav-link-highlight">
          <span>Accedi ai 9 Tomi</span>
          <span aria-hidden="true">→</span>
        </a>
      </nav>

      <!-- Pulsante Hamburger Moderno: Linee Oro Animate & Label Menu -->
      <button type="button" id="hamburger-btn" class="hamburger-btn" aria-label="Menu" aria-expanded="false" aria-controls="grimoire-drawer">
        <span class="hamburger-label">Menu</span>
        <span class="hamburger-box" aria-hidden="true">
          <span class="hamburger-line line-1"></span>
          <span class="hamburger-line line-2"></span>
          <span class="hamburger-line line-3"></span>
        </span>
      </button>
    </div>
  </header>

  <!-- ==========================================================================
       DRAWER OFF-CANVAS DEI 9 TOMI & DEL PORTALE
       ========================================================================== -->
  <div class="drawer-backdrop" id="drawer-backdrop" aria-hidden="true"></div>
  <aside class="grimoire-drawer" id="grimoire-drawer" aria-label="Menu Portale e Grimorio" aria-hidden="true">
    <div class="drawer-header">
      <div class="drawer-brand">
        <span class="drawer-sigil">⚸</span>
        <div class="drawer-title-group">
          <span class="drawer-title">Figlie di Lilith</span>
          <span class="drawer-subtitle">Menu di Navigazione</span>
        </div>
      </div>
      <button type="button" class="drawer-close-btn" id="drawer-close-btn" aria-label="Chiudi Menu">&times;</button>
    </div>

    <div class="drawer-body">
      <!-- Sezione 1: Il Portale & Il Cerchio -->
      <div class="drawer-category-heading">
        <span class="drawer-cat-badge">⚸ Portale</span>
        <span class="drawer-cat-text">La Voce del Cerchio</span>
      </div>
      <ul class="drawer-portal-nav-list">
        <li>
          <a href="<?php echo $lilith_home_url; ?>" class="drawer-portal-link">
            <span class="drawer-portal-glyph">⚸</span>
            <div class="drawer-tome-info">
              <strong class="drawer-tome-name">Home Portale</strong>
              <span class="drawer-tome-sub">Inizio, Cerchio & Introduzione</span>
            </div>
            <span class="drawer-chevron">›</span>
          </a>
        </li>
        <li>
          <a href="<?php echo $lilith_home_url; ?>#lilith-pontifex" class="drawer-portal-link">
            <span class="drawer-portal-glyph">👑</span>
            <div class="drawer-tome-info">
              <strong class="drawer-tome-name">Lilith Pontifex</strong>
              <span class="drawer-tome-sub">Custode, Autore & Ricercatore</span>
            </div>
            <span class="drawer-chevron">›</span>
          </a>
        </li>
        <li>
          <a href="<?php echo $lilith_home_url; ?>#pilastri-cerchio" class="drawer-portal-link">
            <span class="drawer-portal-glyph">🜂</span>
            <div class="drawer-tome-info">
              <strong class="drawer-tome-name">I 4 Pilastri</strong>
              <span class="drawer-tome-sub">Dottrina & Colonne del Tempio</span>
            </div>
            <span class="drawer-chevron">›</span>
          </a>
        </li>
        <li>
          <a href="<?php echo $lilith_grimorio_url; ?>" class="drawer-portal-link">
            <span class="drawer-portal-glyph">🗝</span>
            <div class="drawer-tome-info">
              <strong class="drawer-tome-name">La Soglia del Grimorio</strong>
              <span class="drawer-tome-sub">Vetrina di Accesso ai 9 Tomi</span>
            </div>
            <span class="drawer-chevron">›</span>
          </a>
        </li>
        <li>
          <a href="#calcolatore-root" class="drawer-portal-link active" onclick="var d=document.getElementById('grimoire-drawer'),b=document.getElementById('drawer-backdrop'),h=document.getElementById('hamburger-btn');if(d)d.classList.remove('is-open');if(b)b.classList.remove('is-open');if(h)h.classList.remove('is-active');document.body.classList.remove('drawer-open');">
            <span class="drawer-portal-glyph">⚸</span>
            <div class="drawer-tome-info">
              <strong class="drawer-tome-name">Calcolatore</strong>
              <span class="drawer-tome-sub">Tema Natale • Effemeridi Svizzere</span>
            </div>
            <span class="drawer-chevron">›</span>
          </a>
        </li>
        <li>
          <a href="<?php echo $lilith_home_url; ?>#contatti" class="drawer-portal-link">
            <span class="drawer-portal-glyph">✉</span>
            <div class="drawer-tome-info">
              <strong class="drawer-tome-name">Contatti & Iniziazione</strong>
              <span class="drawer-tome-sub">Richieste & Ingresso nel Cerchio</span>
            </div>
            <span class="drawer-chevron">›</span>
          </a>
        </li>
      </ul>

      <!-- Sezione 2: I 9 Tomi del Grimorio Sacro -->
      <div class="drawer-category-heading" style="margin-top: 1.6rem;">
        <span class="drawer-cat-badge">📜 Grimorio</span>
        <span class="drawer-cat-text">I 9 Tomi Sacri</span>
      </div>
      <ul class="drawer-tomes-list">
        <li>
          <a href="<?php echo $lilith_grimorio_url; ?>#tomo-1" class="drawer-tome-link">
            <span class="drawer-tome-glyph">⚸</span>
            <div class="drawer-tome-info">
              <span class="drawer-tome-num">Tomo I</span>
              <strong class="drawer-tome-name">La Genesi del Cerchio</strong>
              <span class="drawer-tome-sub">La Dottrina & Il Rifiuto Sacro</span>
            </div>
            <span class="drawer-chevron">›</span>
          </a>
        </li>
        <li>
          <a href="<?php echo $lilith_grimorio_url; ?>#tomo-2" class="drawer-tome-link">
            <span class="drawer-tome-glyph">🜂</span>
            <div class="drawer-tome-info">
              <span class="drawer-tome-num">Tomo II</span>
              <strong class="drawer-tome-name">Le Colonne del Tempio</strong>
              <span class="drawer-tome-sub">I 4 Pilastri & i Verbi Sacri</span>
            </div>
            <span class="drawer-chevron">›</span>
          </a>
        </li>
        <li>
          <a href="<?php echo $lilith_grimorio_url; ?>#tomo-3" class="drawer-tome-link">
            <span class="drawer-tome-glyph">♈</span>
            <div class="drawer-tome-info">
              <span class="drawer-tome-num">Tomo III</span>
              <strong class="drawer-tome-name">Le 12 Ferite Primordiali</strong>
              <span class="drawer-tome-sub">Dall'Ombra al Potere Riconquistato</span>
            </div>
            <span class="drawer-chevron">›</span>
          </a>
        </li>
        <li>
          <a href="<?php echo $lilith_grimorio_url; ?>#tomo-4" class="drawer-tome-link">
            <span class="drawer-tome-glyph">⚸</span>
            <div class="drawer-tome-info">
              <span class="drawer-tome-num">Tomo IV</span>
              <strong class="drawer-tome-name">I 12 Volti di Lilith</strong>
              <span class="drawer-tome-sub">Maschere Zodiacali & Tabù Infranti</span>
            </div>
            <span class="drawer-chevron">›</span>
          </a>
        </li>
        <li>
          <a href="<?php echo $lilith_grimorio_url; ?>#tomo-5" class="drawer-tome-link">
            <span class="drawer-tome-glyph">⚖</span>
            <div class="drawer-tome-info">
              <span class="drawer-tome-num">Tomo V</span>
              <strong class="drawer-tome-name">Le 12 Missioni Karmiche</strong>
              <span class="drawer-tome-sub">La Chiamata all'Azione e Destino</span>
            </div>
            <span class="drawer-chevron">›</span>
          </a>
        </li>
        <li>
          <a href="<?php echo $lilith_grimorio_url; ?>#tomo-6" class="drawer-tome-link">
            <span class="drawer-tome-glyph">👑</span>
            <div class="drawer-tome-info">
              <span class="drawer-tome-num">Tomo VI</span>
              <strong class="drawer-tome-name">I 7 Ordini Iniziatici</strong>
              <span class="drawer-tome-sub">Le 7 Correnti Sacre & Paesaggi</span>
            </div>
            <span class="drawer-chevron">›</span>
          </a>
        </li>
        <li>
          <a href="<?php echo $lilith_grimorio_url; ?>#tomo-7" class="drawer-tome-link">
            <span class="drawer-tome-glyph">⚔</span>
            <div class="drawer-tome-info">
              <span class="drawer-tome-num">Tomo VII</span>
              <strong class="drawer-tome-name">I 12 Ruoli nel Tempio</strong>
              <span class="drawer-tome-sub">Vocazioni Sacerdotali del Cerchio</span>
            </div>
            <span class="drawer-chevron">›</span>
          </a>
        </li>
        <li>
          <a href="<?php echo $lilith_grimorio_url; ?>#tomo-8" class="drawer-tome-link">
            <span class="drawer-tome-glyph">🗝</span>
            <div class="drawer-tome-info">
              <span class="drawer-tome-num">Tomo VIII</span>
              <strong class="drawer-tome-name">I 7 Misteri di Lilith</strong>
              <span class="drawer-tome-sub">Soglie Oracolari & Risveglio</span>
            </div>
            <span class="drawer-chevron">›</span>
          </a>
        </li>
        <li>
          <a href="<?php echo $lilith_grimorio_url; ?>#tomo-9" class="drawer-tome-link">
            <span class="drawer-tome-glyph">📜</span>
            <div class="drawer-tome-info">
              <span class="drawer-tome-num">Tomo IX</span>
              <strong class="drawer-tome-name">Il Responso Finale & Mappa</strong>
              <span class="drawer-tome-sub">Le 9 Sezioni del Canone Oracolare</span>
            </div>
            <span class="drawer-chevron">›</span>
          </a>
        </li>
      </ul>

      <!-- Footer del Drawer -->
      <div class="drawer-footer">
        <div class="drawer-footer-invocation">Nella Gloria di Lilith e delle sue Figlie</div>
        <div class="drawer-footer-motto">“In Lilith Gloria”</div>
        <p class="drawer-footer-sub">La Via della Sovranità Interiore</p>
        <a href="#top" class="drawer-top-btn" id="drawer-top-btn">Torna all'Inizio ⚸</a>
      </div>
    </div>
  </aside>

  <!-- ==========================================================================
       BANNER INTRODUTTIVO DELLA PAGINA DEDICATA
       ========================================================================== -->
  <div class="dedicated-hero-banner" id="calcolatore-root">
    <div class="dedicated-badge">
      <span>⚸</span> MOTORE DI CALCOLO ASTRONOMICO • SWISS EPHEMERIS
    </div>
    <h1 class="dedicated-page-title">Calcolatore Tema Natale</h1>
    <p class="dedicated-page-desc">
      Pagina dedicata alla stesura della Carta del Cielo, posizioni planetarie ad alta precisione,
      Luna Nera Lilith, cuspidi Placidus e orientamento strutturale. Architettura 100% Zero-Database a massima tutela della tua privacy.
    </p>
  </div>

  <!-- ==========================================================================
       CONTENUTO PRINCIPALE: COMPONENTE CALCOLATORE
       ========================================================================== -->
  <main id="main-content" role="main">
    <?php
    $markup_file = get_stylesheet_directory() . '/template-parts/calcolatore-markup.php';
    if ( file_exists( $markup_file ) ) {
        include $markup_file;
    } else {
        echo '<p style="text-align:center; padding: 4rem;">Componente calcolatore in caricamento...</p>';
    }
    ?>
  </main>

  <!-- ==========================================================================
       DOCK FLOTTANTE INFERIORE (Sincronizzato: Home, Tema Astrologico, Tomi, Contatti, Menu)
       ========================================================================== -->
  <aside class="floating-portal-dock" id="floating-portal-dock" aria-label="Navigatore Rapido tra Sezioni">
    <a href="<?php echo $lilith_home_url; ?>" class="dock-link" data-section="home" title="Torna alla Home">
      <span class="dock-icon dock-lilith-icon" title="Simbolo di Lilith">⚸</span>
      <span class="dock-text">Home</span>
    </a>
    <span class="dock-sep">•</span>
    <a href="#calcolatore-root" class="dock-link active" data-section="tema-astrologico" title="Tema Astrologico" onclick="window.scrollTo({top:0,behavior:'smooth'});event.preventDefault();">
      <span class="dock-icon">⚸</span>
      <span class="dock-text">Tema Astrologico</span>
    </a>
    <span class="dock-sep">•</span>
    <button type="button" class="dock-link dock-highlight" id="dock-tomes-trigger" data-section="grimorio-gateway" aria-haspopup="true" aria-expanded="false" title="I 9 Tomi della Bibbia di Lilith">
      <span class="dock-icon">📜</span>
      <span class="dock-text">I 9 Tomi</span>
    </button>
    <span class="dock-sep">•</span>
    <a href="<?php echo $lilith_home_url; ?>#contatti" class="dock-link" data-section="contatti" title="Contatti &amp; Iniziazione">
      <span class="dock-icon">✉</span>
      <span class="dock-text">Contatti</span>
    </a>
    <button type="button" class="dock-menu-btn" id="dock-menu-trigger" aria-label="Menu" title="Menu">
      <span>☰</span>
    </button>
  </aside>

  <!-- Popover Verticale dei 9 Tomi dal Dock -->
  <div id="dock-tomes-popover" class="dock-tomes-popover" aria-hidden="true">
    <div class="dock-popover-header">
      <span>⚸ I 9 Capitoli</span>
      <button type="button" class="dock-popover-close" id="dock-popover-close" aria-label="Chiudi">&times;</button>
    </div>
    <div class="dock-popover-list">
      <a href="<?php echo $lilith_grimorio_url; ?>#tomo-1" class="dock-popover-item"><span class="tome-roman">I.</span> La Genesi del Cerchio</a>
      <a href="<?php echo $lilith_grimorio_url; ?>#tomo-2" class="dock-popover-item"><span class="tome-roman">II.</span> Le Colonne del Tempio</a>
      <a href="<?php echo $lilith_grimorio_url; ?>#tomo-3" class="dock-popover-item"><span class="tome-roman">III.</span> Le 12 Ferite Primordiali</a>
      <a href="<?php echo $lilith_grimorio_url; ?>#tomo-4" class="dock-popover-item"><span class="tome-roman">IV.</span> I 12 Volti di Lilith</a>
      <a href="<?php echo $lilith_grimorio_url; ?>#tomo-5" class="dock-popover-item"><span class="tome-roman">V.</span> Le 12 Missioni Karmiche</a>
      <a href="<?php echo $lilith_grimorio_url; ?>#tomo-6" class="dock-popover-item"><span class="tome-roman">VI.</span> I 7 Ordini Iniziatici</a>
      <a href="<?php echo $lilith_grimorio_url; ?>#tomo-7" class="dock-popover-item"><span class="tome-roman">VII.</span> I 12 Ruoli nel Tempio</a>
      <a href="<?php echo $lilith_grimorio_url; ?>#tomo-8" class="dock-popover-item"><span class="tome-roman">VIII.</span> I 7 Misteri di Lilith</a>
      <a href="<?php echo $lilith_grimorio_url; ?>#tomo-9" class="dock-popover-item"><span class="tome-roman">IX.</span> Il Responso Finale</a>
    </div>
  </div>

  <!-- ==========================================================================
       FOOTER UFFICIALE DEL SITO (Invocazione Liturgica & Canali Cerchio)
       ========================================================================== -->
  <footer class="footer-originale-sito" id="footer-originale">
    <div class="footer-solemn-invocation-block">
      <div class="footer-sigil-icon">⚸</div>
      <div class="footer-invocation-solemn">Nella Gloria di Lilith e delle sue Figlie</div>
      <div class="footer-motto-solemn">“In Lilith Gloria”</div>
      <p class="footer-subtext">La Via della Sovranità Interiore • Cerchio Lilithiano di Lilith Pontifex</p>
    </div>

    <div class="footer-divider-ornate">
      <span class="divider-line"></span>
      <span class="divider-glyph">🜂 ⚸ 🜂</span>
      <span class="divider-line"></span>
    </div>

    <div style="max-width: 820px; margin: 0 auto; text-align: center;">
      <p style="font-family: var(--font-display); font-size: 1.15rem; color: #c31818; font-style: italic; margin-bottom: 1.25rem;">
        "Lilith non è un mito. È la memoria che hai sepolto."
      </p>

      <div class="footer-social-links" style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 1.5rem;">
        <a href="https://www.facebook.com/groups/figliedililith" target="_blank" rel="noopener" aria-label="Facebook Figlie di Lilith" title="Gruppo Facebook Figlie di Lilith">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="var(--rosso)" stroke-width="2" fill="none"/>
          </svg>
        </a>
        <a href="https://www.instagram.com/figliedililith/" target="_blank" rel="noopener" aria-label="Instagram Figlie di Lilith" title="Instagram Ufficiale Figlie di Lilith">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="var(--rosso)" stroke-width="2" fill="none"/>
            <circle cx="12" cy="12" r="5" stroke="var(--rosso)" stroke-width="2" fill="none"/>
            <circle cx="17" cy="7" r="1.5" stroke="var(--rosso)" stroke-width="1.5" fill="none"/>
          </svg>
        </a>
        <a href="https://www.youtube.com/@LilithPontifex" target="_blank" rel="noopener" aria-label="YouTube Lilith Pontifex" title="YouTube Lilith Pontifex">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" stroke="var(--rosso)" stroke-width="2" fill="none"/>
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" stroke="var(--rosso)" stroke-width="2" fill="none"/>
          </svg>
        </a>
        <a href="https://www.tiktok.com/@lilith.pontifex" target="_blank" rel="noopener" aria-label="TikTok Lilith Pontifex" title="TikTok Lilith Pontifex">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="var(--rosso)" stroke-width="2" fill="none"/>
          </svg>
        </a>
      </div>

      <p style="font-size: 0.8rem; opacity: 0.7; color: #fff; margin-bottom: 0.5rem;">
        &copy; <?php echo date('Y'); ?> Figlie di Lilith. Tutti i diritti riservati.<br>
        Titolare del trattamento dati: Fabrizio Mana – info@figliedililith.it – CF: mnafrz89t31i470k
      </p>

      <div style="font-size: 0.8rem; opacity: 0.8; display: flex; justify-content: center; gap: 0.75rem;">
        <a href="<?php echo esc_url( get_privacy_policy_url() ? get_privacy_policy_url() : home_url( '/privacy-policy/' ) ); ?>" style="text-decoration: underline;">Privacy Policy</a>
        <span>|</span>
        <a href="<?php echo esc_url( home_url( '/cookie-policy/' ) ); ?>" style="text-decoration: underline;">Cookie Policy</a>
        <span>|</span>
        <a href="mailto:info@figliedililith.it" style="text-decoration: underline;">Contatti</a>
      </div>
    </div>
  </footer>

  <!-- Script Motore Calcolatore Lilith -->

  <!-- Script Interazioni Menu, Drawer & Dock Popover -->
  <script>
  (function() {
    // Gestione Hamburger Menu & Drawer
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const drawer = document.getElementById('grimoire-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    const closeBtn = document.getElementById('drawer-close-btn');
    const topBtn = document.getElementById('drawer-top-btn');
    const dockMenuBtn = document.getElementById('dock-menu-trigger');

    function openDrawer() {
      if (!drawer || !backdrop) return;
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      if (hamburgerBtn) {
        hamburgerBtn.classList.add('is-active');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
      }
      drawer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('drawer-open');
    }

    function closeDrawer() {
      if (!drawer || !backdrop) return;
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      if (hamburgerBtn) {
        hamburgerBtn.classList.remove('is-active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
      drawer.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('drawer-open');
    }

    function toggleDrawer() {
      if (drawer && drawer.classList.contains('is-open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    }

    if (hamburgerBtn) {
      hamburgerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleDrawer();
      });
    }

    if (dockMenuBtn) {
      dockMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleDrawer();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeDrawer();
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', function() {
        closeDrawer();
      });
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });

    if (topBtn) {
      topBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeDrawer();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Gestione Popover Tomi nel Dock
    const tomesPopover = document.getElementById('dock-tomes-popover');
    const tomesCloseBtn = document.getElementById('dock-popover-close');
    const tomesTrigger = document.getElementById('dock-tomes-trigger');

    if (tomesPopover && tomesTrigger) {
      function openPopover() {
        tomesPopover.classList.add('is-open');
        tomesPopover.setAttribute('aria-hidden', 'false');
        tomesTrigger.setAttribute('aria-expanded', 'true');
        tomesTrigger.classList.add('active');
      }
      function closePopover() {
        tomesPopover.classList.remove('is-open');
        tomesPopover.setAttribute('aria-hidden', 'true');
        tomesTrigger.setAttribute('aria-expanded', 'false');
        tomesTrigger.classList.remove('active');
      }
      function togglePopover() {
        if (tomesPopover.classList.contains('is-open')) {
          closePopover();
        } else {
          openPopover();
        }
      }

      tomesTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        togglePopover();
      });

      if (tomesCloseBtn) {
        tomesCloseBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          closePopover();
        });
      }

      document.addEventListener('click', function(e) {
        if (!tomesPopover.contains(e.target) && !tomesTrigger.contains(e.target)) {
          closePopover();
        }
      });
    }
  })();
  </script>

  <?php wp_footer(); ?>
</body>
</html>
