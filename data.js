export const VERSION='0.2.1',B=32,W=1200,H=1000;
export const TYPES={fo:{name:'Forward observer',dice:0},rifle:{name:'Rifle squad',dice:3,squad:true},smg:{name:'SMG squad',dice:2,squad:true},hmg:{name:'HMG team',dice:4,squad:true},pc:{name:'Platoon commander',dice:0},cc:{name:'Company commander',dice:0}};
export const NATIONS={british:{name:'British',command:'start'},us:{name:'US',command:'start'},german:{name:'German',command:'free'},soviet:{name:'Soviet',command:'both',reckless:true},japanese:{name:'Japanese',command:'start',reckless:true},italian:{name:'Italian',command:'both'}};
export const VARIANTS={
 buildingCommand:{name:'Commanders inside the same building sector',source:'CF2.3 / CF8.4',text:'A commander can assist troops inside a building only from that same sector.'},
 platoonAssault:{name:'Single-platoon attacking force',source:'CF8.2',text:'An assault may contain squads from one platoon, with a commander in their chain of command.'},
 hiddenOnOne:{name:'Hidden fire reveals only on a 1',source:'CF6.7, variation 2',text:'A concealed firer is revealed if any firing die is 1. Moving, enemy entry, and successful recon still reveal normally.'},
 hiddenOnTwo:{name:'Hidden fire: 1 reveals, 2 marks the feature',source:'CF6.7, variation 3',text:'A 1 reveals the firer. A 2 without a 1 marks the firing terrain feature. Choose this OR the other hidden-fire variant.'},
 reconTroops:{name:'Designated reconnaissance squads',source:'New: Recon troops',text:'Each side’s first rifle squad is designated recon: recon succeeds on 5+, with independent movement. No extra protective cover.'}
};
const rect=(id,name,type,x,y,w,h)=>({id,name,type,points:[[x,y],[x+w,y],[x+w,y+h],[x,y+h]],capacity:type==='building'?2:8});
const blob=(id,name,type,x,y,rx,ry)=>({id,name,type,points:Array.from({length:12},(_,i)=>{const a=i*Math.PI/6,r=[.92,1,.94,1.03,.9,1,.93,1.02,.91,1,.95,1][i];return[x+Math.cos(a)*rx*r,y+Math.sin(a)*ry*r];}),capacity:8});
const baseTerrain=()=>[
 blob('westwood','West copse','woods',150,210,135,140),blob('southwood','South wood','woods',185,790,150,150),
 blob('eastwood','East wood','woods',1015,205,145,150),blob('southeast','Orchard','woods',1015,785,145,150),
 rect('field1','Wheat field','field',325,80,235,210),rect('field2','South field','field',670,745,215,185),
 blob('hill','Low hill','hill',810,180,145,125),blob('rough','Shell-torn ground','rough',365,580,135,105),
 blob('northgrove','North grove','woods',600,370,110,105),blob('southgrove','South grove','woods',600,715,95,100),
 rect('farm','Farmhouse','building',550,490,100,95),rect('barn','Barn','building',755,455,110,95),
 blob('hedgewood','Hedgerow copse','woods',920,600,100,90),blob('westhill','West rise','hill',160,480,110,90)
];
export const SCENARIOS={
 crossroads:{name:'The Crossroads',tag:'Meeting engagement',desc:'Two infantry companies converge on a village. Break the opposing company by eliminating six squad stands. Original scenario; no time or action limit.',objective:'Eliminate 6 opposing rifle, SMG, or HMG stands.',lossLimit:6,hidden:false,terrain:baseTerrain,deploy:'meeting'},
 farm:{name:'Assault on the Farm',tag:'Prepared defence',desc:'A British company attacks a concealed German force. Clear both farmhouse sectors and occupy them, or break the opposing force. The defenders win by breaking the attackers.',objective:'Blue: occupy Farmhouse AND Barn, or eliminate 6 enemy squads. Red: eliminate 6 blue squads.',lossLimit:6,hidden:true,terrain:baseTerrain,deploy:'defence'},
 woods:{name:'Into the Orchard',tag:'Infantry encounter',desc:'Soviet infantry presses through broken woodland against German troops. Close fighting, restrictive command, and a clear company-break objective.',objective:'Eliminate 6 opposing rifle, SMG, or HMG stands.',lossLimit:6,hidden:false,terrain:()=>baseTerrain().map(t=>t.type==='building'?{...t,type:'rough',name:t.id==='farm'?'Ruined farm':'Ruined barn',capacity:8}:t),deploy:'meeting'}
};
export function createUnits(scenario,options){
 const out=[];for(let side=0;side<2;side++){
  const nation=side===0?(options.nation|| (scenario==='woods'?'soviet':'british')):(options.enemyNation||'german');
  const defence=SCENARIOS[scenario].deploy==='defence'&&side===1;
  const platoons=defence?[[600,530],[810,495],[965,605]]:side===0?[[110,240],[110,500],[120,775]]:[[1090,220],[1090,505],[1080,775]];
  const add=(type,p,x,y,n)=>out.push({id:`${side}-${p}-${n}`,side,type,platoon:p,x,y,facing:side?180:0,quality:options.quality||'regular',bonus:type==='pc'||type==='cc'?1:0,status:'ready',prone:false,hidden:defence,noFire:false,nation,recon:!!options.variants?.reconTroops&&p===1&&n===1,dead:false});
  add('cc',0,side?1140:55,570,'cc');
  platoons.forEach(([x,y],i)=>{const p=i+1;if(defence&&i<2){add('rifle',p,x-17,y-15,1);add('smg',p,x+17,y+15,2);add('rifle',p,x+55,y+85,3);add('hmg',p,x+15,y-95,4);add('pc',p,x+55,y+45,'pc');}
   else {add('rifle',p,x,y-48,1);add(i===2?'smg':'rifle',p,x+36*(side?-1:1),y,2);add('rifle',p,x,y+48,3);add('hmg',p,x+(side?-72:72),y+48,4);add('pc',p,x+(side?-40:40),y+48,'pc');}});
 }
 // Concealed deployment is limited to terrain; the third defending platoon sits in the eastern copse.
 if(SCENARIOS[scenario].hidden){for(const u of out.filter(u=>u.side===1)){if(u.platoon===3){const pos=u.type==='pc'?[945,630]:u.type==='hmg'?[900,620]:({'1':[900,575],'2':[940,575],'3':[980,600]})[u.id.split('-')[2]];[u.x,u.y]=pos;}if(u.type==='cc'){u.x=1040;u.y=790;}}}
 return out;
}
