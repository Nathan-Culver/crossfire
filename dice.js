import * as E from './engine.js';

class DiceNeeded extends Error {
 constructor(dice,context){super('Your dice are ready to roll.');this.request={...context,count:dice.length,generated:[...dice]};}
}

function perform(s,a){
 switch(a.type){
  case 'fire':return E.directFire(s,a.ids,a.target,a.mode);
  case 'react':return E.react(s,a.ids,a.t,a.mode);
  case 'rally':return E.rally(s,a.id);
  case 'recon':return E.recon(s,a.ids,a.terrainId);
  case 'smoke':return E.smokeMission(s,a.id,a.to,a.angle);
  case 'combat':return E.resolveCombat(s,a.groups,a.assistA,a.assistD);
  default:throw Error('Unknown dice action.');
 }
}

export function beginDiceAction(s,action){
 if(s.pendingDice)throw Error('Finish the current dice roll first.');
 if(s.options.autoRoll){const game=structuredClone(s);perform(game,structuredClone(action));return{game,done:true,request:null};}
 const game=structuredClone(s);game.pendingDice={action:structuredClone(action),sides:s.options.mode==='hotseat'?[0,1]:[0],rolls:[]};
 return advanceDiceAction(game);
}

// Replay a transaction from its unchanged baseline. All accepted player rolls are
// immutable in the save; automatic enemy rolls use the same seed on every replay.
export function advanceDiceAction(s){
 const pending=s.pendingDice;if(!pending)throw Error('No player dice action is pending.');
 const trial=structuredClone(s);delete trial.pendingDice;let cursor=0;
 try{
  E.withDice(trial,(generated,context)=>{
   if(!pending.sides.includes(context.side))return generated;
   const entry=pending.rolls[cursor++];if(!entry)throw new DiceNeeded(generated,context);
   if(entry.side!==context.side||entry.label!==context.label||entry.dice.length!==generated.length)throw Error('Stored dice do not match this action.');
   return entry.dice;
  },()=>perform(trial,pending.action));
  if(cursor!==pending.rolls.length)throw Error('The pending action contains unused dice.');
  return{game:trial,done:true,request:null};
 }catch(error){
  if(!(error instanceof DiceNeeded))throw error;
  return{game:s,done:false,request:error.request};
 }
}

export function recordDice(s,values){
 const current=advanceDiceAction(s);if(current.done)throw Error('This dice action is already complete.');
 const r=current.request;
 if(!Array.isArray(values)||values.length!==r.count||values.some(n=>!Number.isInteger(n)||n<1||n>6))throw Error(`Enter exactly ${r.count} dice, each from 1 to 6.`);
 const game=structuredClone(s);game.pendingDice.rolls.push({side:r.side,label:r.label,dice:[...values]});return game;
}

export function cancelDiceAction(s){
 if(!s.pendingDice)throw Error('No dice action is pending.');
 if(s.pendingDice.rolls.length)throw Error('A roll is already recorded. Continue to resolve the action.');
 const game=structuredClone(s);delete game.pendingDice;return game;
}
