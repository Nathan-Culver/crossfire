import {unit,sight,fireEligibility,fireSet,visibleUnits} from './engine.js';
import {firePoint,mix} from './geometry.js';

// Preview uses the same rules and the same virtual movement position as resolution.
export function sightlinePreview(s,state={}){
 if(s.smokeChoice){const c=s.smokeChoice,fo=unit(s,c.id),target=state.target;if(!fo||!target)return[];const view={...s,smoke:s.smoke.filter(m=>m.id!==c.primaryId)},sources=[{from:fo,label:'Observer LOS'},...(c.kind==='scatter'?[{from:{...c.target,id:'original-smoke-target',side:c.side},label:'Original target LOS'}]:[])];return sources.map(({from,label})=>{const result=sight(view,from,{...target,id:'smoke-choice',side:1-c.side});return{from:firePoint(view,from),to:target,clear:result.clear,label:label+': '+result.reason};});}

 const selected=((state.mode==='fire'||s.pending?state.fireIds:null)||state.selected||[]).map(id=>unit(s,id)).filter(u=>u&&(!s.pending||u.side!==s.pending.side));
 let target=state.target?.unitId?unit(s,state.target.unitId):state.target;
 if(s.pending){const m=s.pending.moves[s.pending.index],u=unit(s,m.id);target=u&&{...u,...mix(m.from,m.to,state.reactionT??.5)};}
 if(!target||!selected.length||!s.pending&&!['fire','los'].includes(state.mode))return[];
 return selected.map(f=>{
  const spotting=sight(s,f,target),direct=sight(s,f,target,{direct:true});
  const error=state.mode==='fire'||s.pending?fireEligibility(s,f,{id:'point',side:1-f.side,...target},{reactive:!!s.pending}):!direct.clear?direct.reason:null;
  return{from:firePoint(s,f),to:firePoint(s,target),clear:!error,label:error||spotting.reason};
 });
}

export function lastShotLines(s,viewer=0){
 return(s.lastFire?.shots||[]).filter(v=>v.side===viewer||!v.concealed);
}

export function eligibleFireTargets(s,state={}){
 if(state.mode!=='fire'||s.pending||s.pendingDice||s.deployment||s.winner!==null)return[];
 const f=unit(s,state.selected?.[0]);if(!f||f.side!==s.active)return[];
 return visibleUnits(s,state.viewer??0).filter(t=>t.side!==f.side&&!fireSet(s,state.fireIds||state.selected,t.id,state.fireMode||'single').error).map(t=>t.id);
}

export function lastShotSummary(s,viewer=0){
 const r=s.lastFire;if(!r)return'No stored shot line. Shots made before this update have no recorded firing positions.';
 const known=lastShotLines(s,viewer),hidden=r.shots.length-known.length;
 let text=`LAST SHOT · Initiative ${r.initiative} · Action ${r.action}. `;
 text+=known.map(v=>`${v.firerId} → ${v.targetId}: ${v.result}.`).join(' ');
 if(hidden)text+=' Concealed firer: exact origin withheld by the hidden-fire variant.';
 if(r.reactive)text+=' Reactive fire was checked at the recorded point along the route, before movement finished. A miss may let the target continue into cover.';
 text+=' Orange is the historical shot line, not current visibility.';
 return text;
}
