#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();

const rawOutput = execSync('yarn workspaces list --json', { encoding: 'utf-8' });
const workspaces = rawOutput
  .trim()
  .split('\n')
  .map(line => JSON.parse(line));

// Step 1: Parse workspace dependency data
const workspaceDeps = workspaces.map(ws => {
  const pkgPath = path.join(repoRoot, ws.location, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
  const allDeps = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
    ...pkg.peerDependencies,
  };

  const internalDeps = Object.keys(allDeps).filter(dep =>
    workspaces.some(w => w.name === dep)
  );

  return {
    name: ws.name,
    baseGroup: ws.name.replace(/^@docodylus\//, '').split('-')[0], // "i18n-internal" → "i18n"
    dependsOn: internalDeps,
  };
});

// Step 2: Group nodes by baseGroup
const groups = {};
for (const ws of workspaceDeps) {
  if (!groups[ws.baseGroup]) groups[ws.baseGroup] = [];
  groups[ws.baseGroup].push(ws);
}

// Step 3: Output mermaid diagram
console.log("```mermaid");
console.log("graph TD");

for (const [groupName, nodes] of Object.entries(groups)) {
  console.log(`  subgraph ${groupName.replace("@", "")}`);
  for (const node of nodes) {
    console.log(`    ${node.name.replace("@", "")}`);
  }
  console.log("  end");
}

// Draw the edges
for (const ws of workspaceDeps) {
  for (const dep of ws.dependsOn) {
    console.log(`${ws.name.replace('@', '')} --> ${dep.replace('@', '')}`);
  }
}

console.log("```");
