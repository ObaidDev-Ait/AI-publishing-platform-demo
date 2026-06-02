const { execSync } = require('child_process');

try {
  const revList = execSync('git rev-list --objects --all').toString().split('\n');
  const blobs = revList.map(line => {
    const parts = line.split(' ');
    return { hash: parts[0], path: parts.slice(1).join(' ') };
  }).filter(b => b.hash && b.path);

  const largeFiles = [];
  for (const blob of blobs) {
    if (blob.path) {
      try {
        const sizeStr = execSync(`git cat-file -s ${blob.hash}`).toString().trim();
        const size = parseInt(sizeStr, 10);
        if (size > 50 * 1024 * 1024) { // > 50MB
          largeFiles.push({ path: blob.path, size: (size / 1024 / 1024).toFixed(2) + ' MB' });
        }
      } catch (e) {}
    }
  }

  console.log("Large files (>50MB):", largeFiles);
} catch (e) {
  console.error(e);
}
