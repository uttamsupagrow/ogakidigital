const fs = require("fs");
const path = ".next/server/chunks/407.js";
const s = fs.readFileSync(path, "utf8");
// locate module id 621 definition: webpack minified: 621:(a,b,c)=>{...} or (a,b,c)=>{ with /* 621 */ comment
const m = s.match(/[,{(]621:\((\w+),(\w+),(\w+)\)=>\{/);
if (!m) { console.log("module 621 header not found via simple pattern"); }
else {
  const [full, a, b, c] = m;
  const start = m.index;
  // find the require of react inside this module: pattern c(<id>) assigned to the var used for createContext
  const seg = s.slice(start, start + 30000);
  const idx = seg.indexOf(".createContext");
  const before = seg.slice(0, idx);
  // find all assignments like X=c(123)
  const reqs = [...before.matchAll(new RegExp(`${c}\\((\\d+)\\)`,"g"))].map(x=>x[1]);
  console.log("requires in module before createContext:", reqs.slice(-15));
}
// resolve ids from webpack-runtime map if present
try {
  const rt = fs.readFileSync(".next/server/webpack-runtime.js","utf8");
  console.log("runtime has externals?", /externals/.test(rt));
} catch(e){}
// print nft json deps
const nft = JSON.parse(fs.readFileSync(".next/server/app/_not-found/page.js.nft.json","utf8"));
console.log(nft.files.filter(f=>/react|styled/.test(f)).slice(0,20));
