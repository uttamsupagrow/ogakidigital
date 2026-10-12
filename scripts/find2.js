const fs=require("fs");
const s=fs.readFileSync(".next/server/chunks/407.js","utf8");
for (const id of [1120,4344]) {
  const m=s.match(new RegExp("[,{]"+id+":\\((\\w+)(?:,\\w+)*\\)=>\\{"));
  if(m){const start=m.index;console.log(id, JSON.stringify(s.slice(start,start+180)));}
  else console.log(id,"header not found");
}
