const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    if (file.includes('node_modules') || file.includes('.next')) return;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}
const files = walk('.');
let count = 0;
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let newContent = content.replace(/catch\s*\(\s*([a-zA-Z0-9_]+)\s*:\s*any\s*\)/g, 'catch ($1: unknown)');
  
  // also fix unused variable err
  newContent = newContent.replace(/catch\s*\(\s*err(?::\s*unknown)?\s*\)\s*\{\s*toast\.error/g, 'catch (_err) { toast.error');
  newContent = newContent.replace(/catch\s*\(\s*error(?::\s*unknown)?\s*\)\s*\{\s*toast\.error/g, 'catch (_error) { toast.error');

  // fix theme-provider setMounted issue
  newContent = newContent.replace(/setMounted\(true\);\s*const saved/g, 'const saved');
  newContent = newContent.replace(/setTheme\(saved\);\s*\}\s*\}, \[\]\);/g, 'setTheme(saved);\n    }\n    setMounted(true);\n  }, []);');

  if (content !== newContent) {
    fs.writeFileSync(f, newContent, 'utf8');
    console.log('Fixed', f);
    count++;
  }
});
console.log('Total fixed:', count);
