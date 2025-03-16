/* eslint-disable no-undef */
// add-menu-group.js
const fs = require('node:fs');
const prompt = require('prompt');
const path = require('node:path');
const { promisify } = require('node:util');
const colors = require('@colors/colors/safe');

function extractLastPart(str) {
  const match = str.match(/\/([^/]+)$/);
  return match ? match[1] : str;
}

function transformToPascalCase(str) {
  return str.replace(/(?:^|_)([a-z])/g, (_, match) => match.toUpperCase());
}

function transformToCamelCase(str) {
  return str.replace(/(?:^|_)([a-zA-Z])/g, (_, match, index) =>
    index === 0 ? match.toLowerCase() : match.toUpperCase()
  );
}

function createFileAtPath(filePath, content) {
  const directory = path.dirname(filePath);

  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(filePath, content);
}

const getInput = promisify(prompt.get);
console.log(
  'Welcome to store generator. Please fill some fields and I will create store for you;)'
);
prompt.start({
  message: colors.rainbow('store'),
});
getInput(['file_name', 'id', 'url', 'customizable'])
  .then((result) => {
    const name = extractLastPart(result.file_name);
    const pascalCaseName = transformToPascalCase(name);
    // Preformatted text! DO NOT TOUCH IT!!!
    const contents = `import { defineCrudStore } from '@/core/AppStore';
const use${pascalCaseName}Store = defineCrudStore('${result.id}', '${result.url}', {
  omit: [],
  options: {},
  ${
    result.customizable
      ? `defineCustomState: () => {},
  defineCustomActions: (state) => {},`
      : ''
  }
});
export { use${pascalCaseName}Store };
`;

    createFileAtPath(
      path.join(__dirname, '/../../', '/stores/', `${result.file_name}.js`),
      contents
    );

    console.log('Initialized empty store.');
    console.log('-'.repeat(120));
    console.log('Link store to your component:');
    console.log('');
    console.log(`   import { use${pascalCaseName}Store } from '@/stores/${result.file_name}';`);
    console.log(`   const ${transformToCamelCase(name)} = use${pascalCaseName}Store();`);
    console.log('');
    console.log('Create something amazing✨');
    console.log('');
  })
  .catch((err) => {
    throw err;
  });
