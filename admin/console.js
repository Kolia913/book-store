/* eslint-disable no-undef */
const { spawn } = require('node:child_process');
const path = require('node:path');

const consoleDirPath = path.join(__dirname, '/src/', '/core/', '/console/');

const commandList = {
  'add:menu-item': `${consoleDirPath}add-menu-item.js`,
  'add:menu-group': `${consoleDirPath}add-menu-group.js`,
  'create:menu': `${consoleDirPath}create-menu.js`,
  'create:store': `${consoleDirPath}create-crud-store.js`,
};

const commandArg = process.argv[2];

async function executeCommand(command) {
  const childProcess = spawn('node', [command, ...process.argv.slice(3)], { stdio: 'inherit' });
  childProcess.on('error', (error) => {
    throw error;
  });

  // eslint-disable-next-line no-unused-vars
  childProcess.on('exit', (code, _signal) => {
    process.exit(code);
  });
}

const command = commandList[commandArg];

if (!command) {
  process.stderr.write('Please provide valid command name \n');
} else {
  executeCommand(command);
}
