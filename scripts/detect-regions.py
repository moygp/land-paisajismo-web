import cv2, numpy as np, json, glob, os, sys
src = sys.argv[1]; out = sys.argv[2]; minarea = int(sys.argv[3]) if len(sys.argv)>3 else 40000
os.makedirs(out, exist_ok=True)
files = sorted(glob.glob(src+'/*.jpeg'), key=lambda p:int(os.path.basename(p).split('.')[0]))
manifest=[]
for f in files:
    page=int(os.path.basename(f).split('.')[0])
    im=cv2.imread(f); h,w=im.shape[:2]
    # background = median of a border band
    band=np.concatenate([im[:8].reshape(-1,3), im[-8:].reshape(-1,3), im[:,:8].reshape(-1,3), im[:,-8:].reshape(-1,3)])
    bg=np.median(band,axis=0)
    dist=np.abs(im.astype(int)-bg.astype(int)).sum(axis=2)
    mask=(dist>30).astype(np.uint8)*255
    mask=cv2.morphologyEx(mask, cv2.MORPH_CLOSE, np.ones((9,9),np.uint8))
    n,lab,stats,_=cv2.connectedComponentsWithStats(mask)
    rects=[]
    for i in range(1,n):
        x,y,bw,bh,area=stats[i]
        if bw*bh<minarea or bw<120 or bh<120: continue
        fill=area/(bw*bh)
        if fill<0.55: continue
        rects.append((int(x),int(y),int(bw),int(bh),round(float(fill),2)))
    rects.sort(key=lambda r:(r[0],r[1]))
    for k,(x,y,bw,bh,fill) in enumerate(rects):
        crop=im[y:y+bh,x:x+bw]
        name=f'p{page:02d}_{k+1}.jpg'
        cv2.imwrite(f'{out}/{name}',crop,[cv2.IMWRITE_JPEG_QUALITY,95])
        manifest.append(dict(page=page,idx=k+1,x=x,y=y,w=bw,h=bh,fill=fill,file=name))
    # contact sheet overlay
    ov=im.copy()
    for (x,y,bw,bh,fill) in rects: cv2.rectangle(ov,(x,y),(x+bw,y+bh),(0,0,255),3)
    cv2.imwrite(f'{out}/_page{page:02d}.jpg', cv2.resize(ov,(w//3,h//3)),[cv2.IMWRITE_JPEG_QUALITY,70])
json.dump(manifest,open(out+'/manifest.json','w'),indent=1)
print(len(manifest),'crops')
for m in manifest: print(m['page'],m['idx'],m['w'],m['h'],m['fill'])
