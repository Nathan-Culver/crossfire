// Order matters: the first retained stand leads a declared group move.
export function toggleFriendlySelection(game,selected,id,side){
 const u=game.units.find(u=>u.id===id&&!u.dead);if(!u||u.side!==side)return selected;
 const own=selected.filter(id=>game.units.some(v=>v.id===id&&!v.dead&&v.side===side));
 return own.includes(id)?own.filter(v=>v!==id):[...own,id];
}
