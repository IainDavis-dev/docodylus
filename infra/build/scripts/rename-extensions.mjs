import fs from 'fs/promises';
import path from 'path';

const renameAll = async (dir, fromExt, toExt) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await renameAll(fullPath, fromExt, toExt);
    } else if (entry.name.endsWith(fromExt)) {
      const renamedPath = fullPath.replace(fromExt, toExt);
      console.log(`Renaming ${fullPath} → ${renamedPath}`);
      await fs.rename(fullPath, renamedPath);
    }
  }));
};

(async () => {
  await renameAll(path.resolve('dist/esm'), '.js', '.mjs');
  await renameAll(path.resolve('dist/cjs'), '.js', '.cjs');
})();
