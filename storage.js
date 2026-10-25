import {validateSave} from './engine.js';
const PREFIX='crossfire-sr-v1-';
export const encode=s=>JSON.stringify({savedAt:new Date().toISOString(),game:s});
export function decode(text){if(typeof text!=='string'||text.length>2_000_000)throw Error('Save files must be smaller than 2 MB.');let data;try{data=JSON.parse(text);}catch{throw Error('This file is not valid JSON.');}return validateSave(data.game);}
export function save(s,slot='auto'){try{localStorage.setItem(PREFIX+slot,encode(s));return true;}catch{return false;}}
export function load(slot='auto'){const t=localStorage.getItem(PREFIX+slot);return t?decode(t):null;}
export function hasSave(slot='auto'){try{return!!localStorage.getItem(PREFIX+slot);}catch{return false;}}
export function download(s){const a=document.createElement('a'),url=URL.createObjectURL(new Blob([encode(s)],{type:'application/json'}));a.href=url;a.download=`crossfire-${s.scenario}-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
