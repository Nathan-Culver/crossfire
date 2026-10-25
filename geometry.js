import {B,W,H} from './data.js';
export const EPS=1e-7;
export const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export const mix=(a,b,t)=>({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t});
const cross=(a,b)=>a.x*b.y-a.y*b.x;
export function segmentT(a,b,c,d){const r={x:b.x-a.x,y:b.y-a.y},s={x:d.x-c.x,y:d.y-c.y},den=cross(r,s),q={x:c.x-a.x,y:c.y-a.y};if(Math.abs(den)<EPS)return null;const t=cross(q,s)/den,u=cross(q,r)/den;return t>=-EPS&&t<=1+EPS&&u>=-EPS&&u<=1+EPS?Math.max(0,Math.min(1,t)):null;}
export function inside(p,poly){let yes=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a={x:poly[i][0],y:poly[i][1]},b={x:poly[j][0],y:poly[j][1]};if(pointSegmentDistance(p,a,b)<EPS)return true;if((a.y>p.y)!==(b.y>p.y)&&p.x<(b.x-a.x)*(p.y-a.y)/(b.y-a.y)+a.x)yes=!yes;}return yes;}
export function pointSegmentDistance(p,a,b){const dd=(b.x-a.x)**2+(b.y-a.y)**2,t=dd?Math.max(0,Math.min(1,((p.x-a.x)*(b.x-a.x)+(p.y-a.y)*(b.y-a.y))/dd)):0;return dist(p,mix(a,b,t));}
export function crosses(a,b,poly){if(inside(mix(a,b,.5),poly))return true;return poly.some((v,i)=>segmentT(a,b,{x:v[0],y:v[1]},{x:poly[(i+1)%poly.length][0],y:poly[(i+1)%poly.length][1]})!==null);}
export function feature(s,p){return s.terrain.find(t=>inside(p,t.points))||null;}
export function center(t){return{x:t.points.reduce((n,p)=>n+p[0],0)/t.points.length,y:t.points.reduce((n,p)=>n+p[1],0)/t.points.length};}
export function firePoint(s,u){const f=feature(s,u);return f?.type==='building'?center(f):u;}
export function footprint(u){const size=['pc','cc'].includes(u.type)?B*.55:B,r=(u.facing||0)*Math.PI/180,c=Math.cos(r),sn=Math.sin(r);return[[-1,-1],[1,-1],[1,1],[-1,1]].map(([x,y])=>[u.x+(x*c-y*sn)*size/2,u.y+(x*sn+y*c)*size/2]);}
export function edgeDistance(a,b){const ap=footprint(a),bp=footprint(b);if(crosses({x:ap[0][0],y:ap[0][1]},{x:ap[2][0],y:ap[2][1]},bp)||inside(a,bp)||inside(b,ap))return 0;let d=Infinity;for(const [p,q]of [[ap,bp],[bp,ap]])for(const v of p)for(let i=0;i<q.length;i++)d=Math.min(d,pointSegmentDistance({x:v[0],y:v[1]},{x:q[i][0],y:q[i][1]},{x:q[(i+1)%q.length][0],y:q[(i+1)%q.length][1]}));return d;}
export const near=(a,b)=>edgeDistance(a,b)<B-EPS;
export function inArc(s,a,b,half=45){const p=firePoint(s,a),q=firePoint(s,b),angle=Math.atan2(q.y-p.y,q.x-p.x)*180/Math.PI,delta=((angle-a.facing+540)%360)-180;return Math.abs(delta)<=half+EPS;}
export function sight(s,a,b,{direct=false}={}){
 const p=firePoint(s,a),q=firePoint(s,b),af=feature(s,a),bf=feature(s,b);
 for(const t of s.terrain){if(t===af||t===bf||t.type==='rough')continue;if(crosses(p,q,t.points))return{clear:false,reason:`Blocked by ${t.name}`,blocker:t.id};}
 if(direct)for(const u of s.units){if(u.dead||u.side!==a.side||u.id===a.id||u.id===b.id)continue;if(af?.type==='building'&&feature(s,u)?.id===af.id)continue;if(crosses(p,q,footprint(u)))return{clear:false,reason:`Friendly ${u.id} blocks the shot`,blocker:u.id};}
 return{clear:true,reason:direct?'Clear line of fire':'Clear line of sight'};
}
export function pathCuts(s,a,b){const cuts=[0,1];for(const t of s.terrain)for(let i=0;i<t.points.length;i++){const v=t.points[i],w=t.points[(i+1)%t.points.length],x=segmentT(a,b,{x:v[0],y:v[1]},{x:w[0],y:w[1]});if(x!==null)cuts.push(x);}return[...new Set(cuts.map(x=>+x.toFixed(10)))].sort((a,b)=>a-b);}
export function movementTerrain(s,a,b){const start=feature(s,a)?.id,cuts=pathCuts(s,a,b);let entered=null,leftNew=false;for(let i=0;i<cuts.length-1;i++){const f=feature(s,mix(a,b,(cuts[i]+cuts[i+1])/2));if(f&&f.id!==start){if(entered&&entered!==f.id)return{ok:false,reason:'Stop inside the first new terrain feature.'};if(leftNew)return{ok:false,reason:'A move cannot pass out of the first new terrain feature.'};entered=f.id;}else if(entered)leftNew=true;}
 if(entered&&feature(s,b)?.id!==entered)return{ok:false,reason:'End this move inside the first terrain feature entered.'};return{ok:true};}
// Visibility changes only at feature edges, rays through blocking vertices, arc edges,
// and friendly footprint vertices. Partition those exact events, then test each interval.
export function exposureWindows(s,firer,mover,end,eligible){const a=mover,b=end,cuts=pathCuts(s,a,b),o=firePoint(s,firer),polys=[...s.terrain.map(t=>t.points),...s.units.filter(u=>!u.dead&&u.side===firer.side&&u.id!==firer.id).map(footprint)];
 for(const poly of polys)for(const v of poly){const dx=v[0]-o.x,dy=v[1]-o.y,far={x:o.x+dx*100000,y:o.y+dy*100000},t=segmentT(a,b,o,far);if(t!==null)cuts.push(t);}
 for(const half of [45,90])for(const sign of [-1,1]){const angle=(firer.facing+sign*half)*Math.PI/180,t=segmentT(a,b,o,{x:o.x+Math.cos(angle)*1e7,y:o.y+Math.sin(angle)*1e7});if(t!==null)cuts.push(t);}
 const sorted=[...new Set(cuts.map(x=>+x.toFixed(10)))].sort((a,b)=>a-b),result=[];
 for(let i=0;i<sorted.length-1;i++){const lo=sorted[i],hi=sorted[i+1];if(eligible({...mover,...mix(a,b,(lo+hi)/2)}))result.push([lo,hi]);}
 for(const t of sorted)if(eligible({...mover,...mix(a,b,t)}))result.push([t,t]);
 return result.sort((a,b)=>a[0]-b[0]);
}
export const onBoard=p=>Number.isFinite(p.x)&&Number.isFinite(p.y)&&p.x>=B/2&&p.y>=B/2&&p.x<=W-B/2&&p.y<=H-B/2;
