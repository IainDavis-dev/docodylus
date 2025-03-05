import { writeFile } from 'fs/promises';
import { all as localeCodes } from 'locale-codes';

const validLocales = localeCodes.map(({ tag }) => tag).sort((a, b) => (a < b ? -1 : 1));
const output = `// This file is auto-generated at build time. Do not edit manually.

const validLocales = ${JSON.stringify(validLocales, null, 2).replaceAll('"', '\'')} as const;

export { validLocales };
export type ValidLocale = typeof validLocales[number];
`;

await writeFile('src/infra/i18n/types/validLocales.ts', output);
