const fs=require("fs");
const t=fs.readFileSync(".next/server/chunks/985.js","utf8");
const m=t.match(/[,{]1120:/);
if(m) console.log(JSON.stringify(t.slice(m.index,m.index+300)));
else console.log("1120 not in 985 body; checking all chunks");
for(const f of fs.readdirSync(".next/server/chunks")){
  const s=fs.readFileSync(".next/server/chunks/"+f,"utf8");
  const mm=s.match(/[,{]1120:\(/);
  if(mm){console.log(f, JSON.stringify(s.slice(mm.index,mm.index+220)));}
}
// also check the react externals marker: search for "react" string near module map in runtime files
for(const f of ["webpack-runtime.js"]) {
  const rt=fs.readFileSync(".next/server/"+f,"utf8");
  console.log(f,"mentions react external:", /\"react\"/.test(rt));
}
