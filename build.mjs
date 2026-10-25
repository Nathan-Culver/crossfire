import {mkdir,copyFile,rm} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});
for(const f of ['index.html','styles.css','app.js','data.js','geometry.js','engine.js','ai.js','map.js','storage.js','help.js','manifest.webmanifest','icon.svg','sw.js','.nojekyll']) await copyFile(f,`dist/${f}`);
