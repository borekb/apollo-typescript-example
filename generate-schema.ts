import * as dotenv from 'dotenv';
import * as execa from 'execa';

dotenv.config();

// introspect GitHub API and save the result to `schema.json`
execa.sync('apollo-codegen', [
  'introspect-schema',
  'https://api.github.com/graphql',
  '--output',
  'schema.json',
  '--header',
  'Authorization: bearer ' + process.env.GITHUB_TOKEN,
]);
console.log('schema.json generated');

// inpsect actual queries in `index.ts` and generate TypeScript types in `schema.ts`
execa.sync('apollo-codegen', [
  'generate',
  'index.ts',
  '--schema',
  'schema.json',
  '--target',
  'typescript',
  '--tag-name',
  'gql',
  '--output',
  'schema.ts',
  '--add-typename',
]);
console.log('schema.ts generated');
