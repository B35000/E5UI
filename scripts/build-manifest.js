const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    return e.isDirectory() ? walk(full) : [full];
  });
}

const files = walk(BUILD_DIR)
  .map((f) => '/' + path.relative(BUILD_DIR, f).split(path.sep).join('/'))
  .filter((f) => {
    const name = f.split('/').pop();
    return (
      !name.startsWith('.') &&            // .DS_Store, .gitkeep, etc.
      !f.endsWith('.map') &&
      f !== '/file-manifest.json'
    );
  });

fs.writeFileSync(
  path.join(BUILD_DIR, 'file-manifest.json'),
  JSON.stringify({ files }, null, 2)
);
console.log(`file-manifest.json: ${files.length} files`);