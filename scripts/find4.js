const fs=require("fs");
const s=fs.readFileSync(".next/server/chunks/407.js","utf8");
for (const id of [1120,4344]) {
  const re=new RegExp("[,{]"+id+":\\((\\w+),(\\w+),(\\w+)\\)=>\\{");
  const m=s.match(re);
  if(m){ console.log(id,"header:",JSON.stringify(s.slice(m.index,m.index+250))); }
  else {
    const re2=new RegExp("[,{]"+id+":");
    const m2=s.match(re2);
    if(m2) console.log(id,"ctx:",JSON.stringify(s.slice(m2.index,m2.index+250)));
    else console.log(id,"not found as own module in this chunk");
  }
}
// also check other chunks for these modules
for(const f of fs.readdirSync(".next/server/chunks")){
  if(f==="407.js")continue;
  const t=fs.readFileSync(".next/server/chunks/"+f,"utf8");
  for(const id of ["1120:","4344:"]){
    if(t.includes(","+id)||t.includes("{"+id)){ console.log("module",id,"also in",f.slice(0,12)); }
  }
}
