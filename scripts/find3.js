const fs=require("fs");
const s=fs.readFileSync(".next/server/chunks/407.js","utf8");
for (const id of [1120,4344]) {
  const m=s.match(new RegExp("\\d+:\\([^)]*\\)=>\\{[^}]{0,80}?\\b"+id+"\\b"));// not useful
  // Instead: find module headers and their string requires: webpack often keeps module path comments in dev only. Try locating "react" externals map in runtime
}
const rt=fs.readFileSync(".next/server/webpack-runtime.js","utf8");
console.log(rt.slice(0,600));
