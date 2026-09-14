"""Independent native binding; receives cases on stdin, no user data."""
import sys, json, datetime, zoneinfo, os
sys.path.insert(0, '.validation-python')
import swisseph as swe
import tzdata
zoneinfo.reset_tzpath([os.path.abspath('.validation-python/tzdata/zoneinfo')])
swe.set_ephe_path('.validation-ephemeris')
ids=dict(Sun=0,Moon=1,Mercury=2,Venus=3,Mars=4,Jupiter=5,Saturn=6,Uranus=7,Neptune=8,Pluto=9,Lilith=12,TrueLilith=13,TrueNode=11,Chiron=15,Ceres=17,Pallas=18,Juno=19,Vesta=20)
out=[]
for req in json.load(sys.stdin):
    try:
        local=datetime.datetime.fromisoformat(req['date']+'T'+req['time'])
        utc=local.replace(tzinfo=zoneinfo.ZoneInfo(req['timezone']),fold=1 if req.get('dst')=='later' else 0).astimezone(datetime.timezone.utc)
        tt,ut=swe.utc_to_jd(utc.year,utc.month,utc.day,utc.hour,utc.minute,utc.second)
        cusps,angles=swe.houses(ut,req['latitude'],req['longitude'],req['house_system'].encode())
        positions={};speeds={}
        for name,body in ids.items():
            p,flags=swe.calc_ut(ut,body,swe.FLG_SWIEPH|swe.FLG_SPEED)
            if not flags&swe.FLG_SWIEPH: raise ValueError('Non-Swiss fallback')
            positions[name]=p[0];speeds[name]=p[3]
        sun,_=swe.calc_ut(ut,0,258)
        altitude=swe.azalt(ut,swe.ECL2HOR,(req['longitude'],req['latitude'],0),0,15,sun[:3])[1]
        out.append(dict(jd=ut,jdTT=tt,cusps=cusps,angles=angles,positions=positions,speeds=speeds,isDiurnal=altitude>=0,utc=utc.isoformat().replace('+00:00','Z')))
    except Exception as e: out.append(dict(error=str(e)))
print(json.dumps(dict(version=swe.version,tzVersion=tzdata.IANA_VERSION,results=out)))
