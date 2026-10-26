import test from 'node:test';import assert from 'node:assert/strict';
import * as E from '../engine.js';
import {beginDiceAction,advanceDiceAction,recordDice,cancelDiceAction} from '../dice.js';
import {encode,decode} from '../storage.js';
const stand=(id,side,x,y,extra={})=>({id,side,x,y,type:'rifle',platoon:1,facing:side?180:0,quality:'regular',bonus:0,status:'ready',hidden:false,noFire:false,nation:'german',prone:false,dead:false,...extra});
function fixture(options={}){const s=E.newGame({seed:4,...options});s.terrain=[];s.units=[stand('a',0,100,100),stand('b',1,500,100)];return s;}
const fire={type:'fire',ids:['a'],target:'b',mode:'single'};
function finish(result,faces){return advanceDiceAction(recordDice(result.game,faces));}

test('manual fire requests the correct dice before changing any battle state',()=>{
 const s=fixture(),before=structuredClone(s),r=beginDiceAction(s,fire);
 assert.deepEqual(s,before);assert(!r.done);assert.equal(r.request.count,3);assert.equal(r.request.side,0);assert.equal(r.game.actions,0);assert.equal(r.game.units[1].status,'ready');
 const done=finish(r,[5,6,1]);assert(done.done);assert.equal(done.game.units[1].status,'suppressed');assert.equal(done.game.active,0);assert.deepEqual(done.game.lastRoll.dice,[5,6,1]);assert(!done.game.pendingDice);
});
test('automatic rolling matches normal seeded engine resolution without a prompt',()=>{
 const s=fixture({autoRoll:true}),expected=structuredClone(s);E.directFire(expected,['a'],'b');const r=beginDiceAction(s,fire);assert(r.done);assert.deepEqual(r.game,expected);
});
test('physical dice must have the exact count and integer faces 1 through 6',()=>{
 const r=beginDiceAction(fixture(),fire);
 for(const values of [[6],[6,6,7],[0,1,2],[1.5,2,3],['6',2,3]])assert.throws(()=>recordDice(r.game,values),/exactly/);
 assert.equal(r.game.pendingDice.rolls.length,0);
});
test('accepted player dice survive save/load and cannot be cancelled or rerolled',()=>{
 const r=beginDiceAction(fixture(),fire),recorded=recordDice(r.game,[1,2,3]),saved=decode(encode(recorded));
 assert.throws(()=>cancelDiceAction(saved),/already recorded/);const done=advanceDiceAction(saved);assert(done.done);assert.deepEqual(done.game.lastRoll.dice,[1,2,3]);assert.equal(done.game.active,1);
 const cancelled=cancelDiceAction(r.game);assert(!cancelled.pendingDice);assert.equal(cancelled.seed,r.game.seed);
});
test('group fire asks each stand separately and preserves earlier rolls',()=>{
 const s=fixture();s.units.push(stand('a2',0,100,140));let r=beginDiceAction(s,{...fire,ids:['a','a2'],mode:'group'});
 r=finish(r,[5,1,1]);assert(!r.done);assert.match(r.request.label,/a2/);assert.equal(r.game.units[1].status,'ready');
 r=finish(r,[5,1,1]);assert(r.done);assert.equal(r.game.units[1].status,'pinned');assert.equal(r.game.active,1);assert.deepEqual(r.game.lastFire.shots.map(v=>v.dice),[[5,1,1],[5,1,1]]);
});
test('solo enemy dice remain automatic and hotseat prompts the acting side',()=>{
 const s=fixture();s.active=1;const a={...fire,ids:['b'],target:'a'};assert(beginDiceAction(s,a).done);
 s.options.mode='hotseat';const r=beginDiceAction(s,a);assert(!r.done);assert.equal(r.request.side,1);
});
test('manual reactive fire uses the interruption point and retains exact recorded dice',()=>{
 const s=fixture();s.active=1;E.beginMove(s,['b'],{x:450,y:100});const r=beginDiceAction(s,{type:'react',ids:['a'],t:.5,mode:'single'});assert.equal(r.request.count,3);
 const done=finish(r,[5,1,1]);assert.equal(done.game.units[1].x,475);assert.equal(done.game.units[1].status,'pinned');assert.equal(done.game.lastFire.shots[0].to.x,475);
});
test('rally, recon, and smoke each request their own roll and apply results once',()=>{
 let s=fixture();s.units[0].status='pinned';let r=beginDiceAction(s,{type:'rally',id:'a'});assert.match(r.request.label,/rally/);r=finish(r,[6]);assert.equal(r.game.units[0].status,'ready');assert.equal(r.game.actions,1);
 s=fixture();s.terrain=[{id:'wood',name:'Wood',type:'woods',capacity:8,points:[[450,50],[550,50],[550,150],[450,150]]}];s.units[1].hidden=true;r=beginDiceAction(s,{type:'recon',ids:['a'],terrainId:'wood'});r=finish(r,[6]);assert.equal(r.game.units[1].hidden,false);
 s=fixture();s.units[0].type='fo';s.support[0]={name:'Mortar smoke',length:3,missions:12,remaining:12};r=beginDiceAction(s,{type:'smoke',id:'a',to:{x:300,y:300},angle:90});assert.equal(r.game.support[0].remaining,12);r=finish(r,[3]);assert.equal(r.game.smoke.length,1);assert.equal(r.game.support[0].remaining,11);
});
test('close combat prompts each hotseat side and tied totals request fresh rolls',()=>{
 const s=fixture({mode:'hotseat'});s.units[0].x=468;s.combat={side:0,target:'b',attackers:['a'],surprise:false,origins:{a:{x:100,y:100}}};
 let r=beginDiceAction(s,{type:'combat',groups:[{attackers:['a'],defenders:['b']}],assistA:null,assistD:null});assert.equal(r.request.side,0);
 r=finish(r,[3]);assert.equal(r.request.side,1);r=finish(r,[3]);assert(!r.done);assert.match(r.request.label,/tie reroll/);
 r=finish(r,[6]);r=finish(r,[1]);assert(r.done);assert(r.game.units[1].dead);assert(!r.game.units[0].dead);
});
test('save validation rejects malformed pending rolls and preserves auto-roll choice',()=>{
 const r=beginDiceAction(fixture(),fire);r.game.pendingDice.rolls=[{side:0,label:'bad',dice:[9]}];assert.throws(()=>decode(encode(r.game)),/pending player dice/);
 const s=fixture({autoRoll:true});assert.equal(decode(encode(s)).options.autoRoll,true);s.options.autoRoll='true';assert.throws(()=>decode(encode(s)),/auto-roll/);
});
