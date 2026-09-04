import cv2, numpy as np, json, os
PORT='/home/claude/src/LAND_portafolio_2026'; FIN='/home/claude/src/FIN__Presentacio_n_F'
import sys
OUT=sys.argv[1] if len(sys.argv)>1 else '/home/claude/site/public/media'
CALIZA=np.array([227,233,232])  # BGR of #E8E9E3
manifest={}
def page(src,n): return cv2.imread(f'{src}/{n}.jpeg')
def crop(src,n,x,y,w,h): return page(src,n)[y:y+h,x:x+w]
def autotrim(im,bg,tol=24,pad=6):
    d=np.abs(im.astype(int)-bg.astype(int)).sum(axis=2)>tol
    ys,xs=np.where(d)
    if len(xs)==0: return im
    x0,x1,y0,y1=max(xs.min()-pad,0),min(xs.max()+pad,im.shape[1]),max(ys.min()-pad,0),min(ys.max()+pad,im.shape[0])
    return im[y0:y1,x0:x1]
def split_h(im,bg,tol=24,mingap=6):
    """split a merged crop at internal vertical background gaps"""
    d=(np.abs(im.astype(int)-bg.astype(int)).sum(axis=2)>tol).mean(axis=0)
    cols=np.where(d<0.03)[0]
    # find runs of background columns inside
    parts=[];start=0;run=[]
    prev=None
    gaps=[]
    for c in cols:
        if prev is not None and c==prev+1: run.append(c)
        else:
            if len(run)>=mingap and run[0]>10 and run[-1]<im.shape[1]-10: gaps.append((run[0],run[-1]))
            run=[c]
        prev=c
    if len(run)>=mingap and run[0]>10 and run[-1]<im.shape[1]-10: gaps.append((run[0],run[-1]))
    x=0
    for g0,g1 in gaps:
        parts.append(im[:,x:g0]); x=g1+1
    parts.append(im[:,x:])
    return [autotrim(p,bg) for p in parts if p.shape[1]>50]
def diptych(a,b,gap=0):
    h=min(a.shape[0],b.shape[0])
    def fit(im): 
        s=h/im.shape[0]; return cv2.resize(im,(int(im.shape[1]*s),h),interpolation=cv2.INTER_AREA)
    a,b=fit(a),fit(b)
    g=np.full((h,gap,3),(19,26,16),np.uint8)
    return np.concatenate([a,g,b],axis=1)
def save(slug,name,im,tag='FOTOGRAFÍA'):
    os.makedirs(f'{OUT}/{slug}',exist_ok=True)
    p=f'{OUT}/{slug}/{name}.webp'
    cv2.imwrite(p,im,[cv2.IMWRITE_WEBP_QUALITY,82])
    h,w=im.shape[:2]
    manifest.setdefault(slug,{})[name]=dict(src=f'/media/{slug}/{name}.webp',width=int(w),height=int(h),tag=tag)
M={ (m['page'],m['idx']):m for m in json.load(open('/home/claude/work/crops_port/manifest.json'))}
def trim_label(im,tol=40,maxrows=48):
    """Quita las filas inferiores de fondo (etiqueta mono bajo la imagen) que la detección pudo incluir."""
    bg=np.median(im[-1].astype(int),axis=0)
    d=(np.abs(im.astype(int)-bg).sum(axis=2)>tol).mean(axis=1)
    y=im.shape[0]-1; n=0
    while y>0 and d[y]<0.6 and n<maxrows: y-=1; n+=1
    return im[:y+1]
def pc(n,i):
    m=M[(n,i)]; return trim_label(crop(PORT,n,m['x'],m['y'],m['w'],m['h']))
def plan(n): return autotrim(crop(PORT,n,72,148,1312,545),CALIZA)

# Portefino
s='portefino'
save(s,'hero-parque-magueyes-aerea',pc(19,1),'RENDER')
save(s,'vista-conjunto',pc(4,1),'RENDER')
save(s,'plan-maestro',plan(5),'PLANO')
save(s,'conjunto-a',pc(6,1),'RENDER'); save(s,'conjunto-b',pc(6,2),'RENDER')
save(s,'espejo-agua',pc(7,1),'RENDER')
save(s,'terraza-a',pc(8,1),'RENDER'); save(s,'terraza-b',pc(9,1),'RENDER'); save(s,'terraza-c',pc(9,2),'RENDER'); save(s,'terraza-d',pc(10,1),'RENDER')
save(s,'plano-parque-lineal',plan(11),'PLANO')
save(s,'parque-lineal-a',pc(14,1),'RENDER'); save(s,'parque-lineal-b',pc(15,1),'RENDER')
save(s,'plano-magueyes',plan(16),'PLANO')
save(s,'magueyes-b',pc(20,1),'RENDER'); save(s,'magueyes-cancha',pc(21,1),'RENDER')
# CCR
s='centro-de-convenciones-de-reynosa'
save(s,'hero-plaza-acceso',pc(22,1)); save(s,'plano-propuesta',plan(23),'PLANO'); save(s,'acceso-principal',pc(25,1))
# Banregio
s='banregio-back-office'
save(s,'hero-acceso-principal',crop(PORT,26,M[(26,1)]['x'],M[(26,1)]['y'],M[(26,1)]['w'],M[(26,1)]['h']-21),'RENDER'); save(s,'plan-maestro',plan(27),'PLANO')
save(s,'asoleamiento',pc(28,1),'DIAGRAMA'); save(s,'plano-acceso-principal',plan(33),'PLANO')
save(s,'acceso-posterior',pc(34,1),'RENDER'); save(s,'plano-acceso-posterior',plan(35),'PLANO'); save(s,'parque-lineal',pc(36,1),'RENDER')
# Vía Zócalo
s='via-zocalo'
save(s,'hero-nivel-menos-1',pc(37,1),'RENDER'); save(s,'plano-niveles',plan(38),'PLANO'); save(s,'seccion-jardinera',plan(39),'PLANO')
save(s,'nivel-9-a',pc(40,1),'RENDER'); save(s,'nivel-9-b',pc(41,1),'RENDER')
# Torre Miravalle
s='torre-miravalle'
save(s,'hero-arbolado',pc(42,1)); save(s,'situacion-actual',pc(43,1)); save(s,'plano-propuesta',plan(44),'PLANO')
save(s,'arbolado-a',pc(46,1))
parts=split_h(pc(47,1),CALIZA); print('p47 split',[p.shape for p in parts])
save(s,'arbolado-b',parts[0]); save(s,'arbolado-c',parts[-1])
# Casa del Sauce
s='casa-del-sauce'
a,b=pc(48,1),pc(52,1)
save(s,'hero-diptico',diptych(a,b)); save(s,'jardin-a',a); save(s,'jardin-b',b); save(s,'plano-plantacion',plan(49),'PLANO')
# Casa de Piedra
s='casa-de-piedra'
a,b=pc(54,1),pc(54,2)
save(s,'hero-diptico',diptych(a,b)); save(s,'muro',pc(53,1)); save(s,'jardin-a',a); save(s,'terraza-b',b)
parts=split_h(pc(55,1),CALIZA); print('p55 split',[p.shape for p in parts])
save(s,'muros-a',parts[0]); save(s,'muros-b',parts[-1])
save(s,'patio',pc(56,1)); save(s,'escaleras-a',pc(57,1)); save(s,'escaleras-b',pc(57,2))
# FINSA (draft)
s='parque-industrial-finsa'
FM={ (m['page'],m['idx']):m for m in json.load(open('/home/claude/work/crops_finsa/manifest.json'))}
def fc(n,i):
    m=FM[(n,i)]; return crop(FIN,n,m['x'],m['y'],m['w'],m['h'])
WHITE=np.array([255,255,255])
pg=page(FIN,13); save(s,'plano-vegetacion',autotrim(pg[70:pg.shape[0]-50,20:pg.shape[1]-20],WHITE,tol=40),'PLANO')
save(s,'hero-acceso',fc(16,1),'RENDER'); save(s,'aerea',fc(15,1),'RENDER'); save(s,'acceso-b',fc(17,1),'RENDER'); save(s,'terraza',fc(21,1),'RENDER'); save(s,'arbolado',fc(22,1),'RENDER')
json.dump(manifest,open(OUT+'/../../media-manifest.json','w'),indent=1,ensure_ascii=False)
for slug,items in manifest.items():
    print(slug, {k:(v['width'],v['height']) for k,v in items.items()})
