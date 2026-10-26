import * as T from 'three';
import {pointInPolygon} from './table.js';

// Clip complete 3D triangles against the table's vertical edge planes. Attribute
// interpolation preserves walls, lighting and textures on nonrectangular boards.
export function clipMeshToTable(geometry,outline){
 geometry.computeBoundingBox();const box=geometry.boundingBox;if([[box.min.x,box.min.z],[box.max.x,box.min.z],[box.max.x,box.max.z],[box.min.x,box.max.z]].every(([x,y])=>pointInPolygon({x,y},outline)))return geometry.clone();
 const source=geometry.index?geometry.toNonIndexed():geometry,attrs=Object.entries(source.attributes),out=Object.fromEntries(attrs.map(([k])=>[k,[]])),p=source.attributes.position,sign=Math.sign(outline.reduce((n,a,i)=>{const b=outline[(i+1)%outline.length];return n+a[0]*b[1]-b[0]*a[1];},0))||1;
 for(let i=0;i<p.count;i+=3){let poly=[0,1,2].map(j=>Object.fromEntries(attrs.map(([k,a])=>[k,Array.from({length:a.itemSize},(_,n)=>a.array[(i+j)*a.itemSize+n])])));
  for(let e=0;e<outline.length&&poly.length;e++){const a=outline[e],b=outline[(e+1)%outline.length],distance=v=>sign*((b[0]-a[0])*(v.position[2]-a[1])-(b[1]-a[1])*(v.position[0]-a[0])),input=poly;poly=[];for(let j=0;j<input.length;j++){const v=input[j],w=input[(j+1)%input.length],dv=distance(v),dw=distance(w),vin=dv>=-1e-6,win=dw>=-1e-6,cut=()=>{const t=dv/(dv-dw);return Object.fromEntries(attrs.map(([k])=>[k,v[k].map((n,c)=>n+(w[k][c]-n)*t)]));};if(vin&&win)poly.push(w);else if(vin&&!win)poly.push(cut());else if(!vin&&win)poly.push(cut(),w);}}
  for(let j=1;j<poly.length-1;j++)for(const v of [poly[0],poly[j],poly[j+1]])for(const [k]of attrs)out[k].push(...v[k]);
 }
 const result=new T.BufferGeometry();for(const [k,a]of attrs)result.setAttribute(k,new T.Float32BufferAttribute(out[k],a.itemSize));if(source!==geometry)source.dispose();return result;
}
