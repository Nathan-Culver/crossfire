import test from 'node:test';
import assert from 'node:assert/strict';
import * as E from '../engine.js';
import {firePoint} from '../geometry.js';
import {sightlinePreview,lastShotLines,lastShotSummary,eligibleFireTargets} from '../sightlines.js';
import {renderMap} from '../map.js';
import {encode,decode} from '../storage.js';
const stand=(id,side,x,y,extra={})=>({id,side,x,y,type:'rifle',platoon:1,facing:side?180:0,quality:'regular',bonus:0,status:'ready',hidden:false,noFire:false,nation:'german',prone:false,dead:false,...extra});
const box=(id,x,y,w,h,type='woods')=>({id,name:id,type,capacity:8,points:[[x,y],[x+w,y],[x+w,y+h],[x,y+h]]});
function fixture(){const s=E.newGame({seed:1});s.terrain=[];s.units=[stand('a',0,100,700),stand('b',1,600,100)];return s;}
function missSeed(s,n=3){while(E.roll(structuredClone(s),n).some(d=>d>=5))s.seed++;}

test('reaction records the actual clear mid-route point although both endpoints are blocked',()=>{
 const s=fixture();s.terrain=[box('left',300,300,200,100),box('right',700,300,200,100)];
 const start={...s.units[0]},end={...start,x:1100};
 assert(!E.sight(s,s.units[1],start).clear);assert(!E.sight(s,s.units[1],end).clear);
 E.beginMove(s,['a'],end);assert(s.pending);missSeed(s);E.react(s,['b'],.5);
 assert.equal(s.units[0].x,1100);assert(!E.sight(s,s.units[1],s.units[0]).clear);
 assert.deepEqual(s.lastFire.shots[0].to,{x:600,y:700});assert.deepEqual(s.lastFire.movement.at,{x:600,y:700});
 assert(E.sight(s,{...s.units[1],...s.lastFire.shots[0].from},{...start,...s.lastFire.shots[0].to}).clear);
 const saved=decode(encode(s));assert.deepEqual(saved.lastFire,s.lastFire);
 assert.match(lastShotSummary(saved),/before movement finished/);
 assert.match(renderMap(saved),/data-shot-line/);assert.doesNotMatch(renderMap(saved,{showShot:false}),/data-shot-line/);
});

test('blocked reactive fire is rejected without moving the target or leaving a phantom trail',()=>{
 const s=fixture();s.terrain=[box('left',300,300,200,100),box('right',700,300,200,100)];
 E.beginMove(s,['a'],{x:1100,y:700});const before=structuredClone(s);
 assert.throws(()=>E.react(s,['b'],0),/Blocked/);assert.deepEqual(s,before);
});

test('fully intervening terrain and smoke prevent any reactive-fire option',()=>{
 for(const type of ['woods','field','hill','building','smoke']){const s=fixture();
  if(type==='smoke')s.smoke=[{id:'smoke',side:0,x:350,y:400,length:6,angle:0}];
  else s.terrain=[box('screen',0,350,1200,100,type)];
  E.beginMove(s,['a'],{x:150,y:700});assert.equal(s.pending,null,type);assert.equal(s.lastFire,null,type);
 }
});

test('preview agrees with actual terrain, friendly-base and HMG arc fire restrictions',()=>{
 const s=fixture();s.units[0].y=100;s.units[1].x=800;
 const state={selected:['a'],target:{unitId:'b'},mode:'fire'};
 assert(sightlinePreview(s,state)[0].clear);
 s.terrain=[box('wood',400,50,100,100)];assert.match(sightlinePreview(s,state)[0].label,/Blocked by wood/);
 s.terrain=[];s.units.push(stand('friend',0,400,100));assert.match(sightlinePreview(s,state)[0].label,/Friendly/);
 s.units.pop();s.units[0].type='hmg';s.units[0].facing=180;assert.match(sightlinePreview(s,state)[0].label,/arc/);
});

test('building inspection and recorded shots use both sector centers',()=>{
 const s=fixture();s.units[0].y=100;s.units[1].x=800;s.terrain=[box('house',50,50,120,120,'building'),box('barn',750,50,120,120,'building')];
 const v=sightlinePreview(s,{selected:['a'],target:{unitId:'b'},mode:'los'})[0];
 assert.deepEqual(v.from,firePoint(s,s.units[0]));assert.deepEqual(v.to,firePoint(s,s.units[1]));
 E.directFire(s,['a'],'b');assert.deepEqual(s.lastFire.shots[0].to,v.to);
});

test('hidden-fire variant does not leak concealed enemy origins through shot overlays',()=>{
 const s=fixture();s.active=1;s.units[0].y=100;s.units[1].hidden=true;s.terrain=[box('wood',550,50,100,100)];s.options.variants.hiddenOnOne=true;
 while(E.roll(structuredClone(s),3).includes(1))s.seed++;
 E.directFire(s,['b'],'a');assert(s.units[1].hidden);assert.equal(lastShotLines(s,0).length,0);assert.equal(lastShotLines(s,1).length,1);
 assert.match(lastShotSummary(s,0),/exact origin withheld/);assert.doesNotMatch(renderMap(s,{viewer:0}),/data-shot-line/);
});

test('old saves default to no record and malformed trace coordinates are rejected',()=>{
 const s=fixture();s.version='0.2.0';delete s.lastFire;assert.equal(decode(encode(s)).lastFire,null);
 s.units[0].y=100;E.directFire(s,['a'],'b');s.lastFire.shots[0].to.x=Infinity;assert.throws(()=>E.validateSave(s),/sightline/);
});

test('map fire targets expose only the nearest eligible revealed enemy and respect suppression',()=>{
 const s=fixture();s.units[0].y=100;s.units.push(stand('far',1,1000,100),stand('hidden',1,200,100,{hidden:true}));
 const state={selected:['a'],mode:'fire',viewer:0};assert.deepEqual(eligibleFireTargets(s,state),['b']);
 s.units[0].status='pinned';assert.deepEqual(eligibleFireTargets(s,state),['b']);
 s.units[0].status='suppressed';assert.deepEqual(eligibleFireTargets(s,state),[]);
});
