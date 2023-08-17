import 'zx/globals';

const apiSchemaEndpoint =
  process.env.BE_ENV === 'dev' ? 'https://be.dev.pdogs.ntu.im/openapi.json' : 'https://be.pdogs.ntu.im/openapi.json';
const apiUsername = await question('Enter PDOGS API username: ');

await $`wget --user=${apiUsername} --ask-password ${apiSchemaEndpoint} --directory-prefix=./temp`;
await $`npx openapi-typescript ./temp/openapi.json -o ./types/schema.d.ts`;
await $`rm -rf ./temp`;
