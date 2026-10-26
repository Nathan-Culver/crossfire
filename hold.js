// Native pointer events keep long-press distinct from dragging and pinching.
export function installUnitHold(viewport,{pick,onContext,signal}){
 let timer=null,origin=null;const clear=()=>{clearTimeout(timer);timer=null;};
 viewport.addEventListener('pointerdown',e=>{clear();if(e.button!==0||e.isPrimary===false)return;const id=pick(e);if(!id)return;origin={x:e.clientX,y:e.clientY,id,pointer:e.pointerId};timer=setTimeout(()=>{timer=null;onContext(id,{x:origin.x,y:origin.y});},500);},{signal,capture:true});
 viewport.addEventListener('pointermove',e=>{if(origin&&Math.hypot(e.clientX-origin.x,e.clientY-origin.y)>8)clear();},{signal,capture:true});
 for(const type of ['pointerup','pointercancel','lostpointercapture'])viewport.addEventListener(type,clear,{signal,capture:true});
 signal.addEventListener('abort',clear,{once:true});
}
