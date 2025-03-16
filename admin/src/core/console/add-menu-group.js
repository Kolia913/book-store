/* eslint-disable no-undef */
// add-menu-group.js
const fs = require('node:fs');
const prompt = require('prompt');
const path = require('node:path');
const { promisify } = require('node:util');
const colors = require('@colors/colors/safe');

const getInput = promisify(prompt.get);
console.log(
  "Welcome to menu generator. Please fill some fields and I will create menu group for you:) P.S. Field 'key' is optional ;)"
);
prompt.start({
  message: colors.rainbow('group'),
});
getInput(['title', 'key'])
  .then((result) => {
    const newGroup = {
      isGroup: true,
      title: result.title,
      key: result?.key ? result.key : null,
      subItems: [],
    };
    if (!newGroup.title) {
      console.error('Please provide the group title.');
      process.exit(1);
    }

    const menuData = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../../', 'menu.json')));

    const existingitem = menuData.find((item) => item.key === result.key && item.key !== null);
    if (!existingitem) {
      menuData.push(newGroup);
    } else {
      console.error('Key already exists! Please enter a unique key');
      process.exit(1);
    }

    fs.writeFileSync(
      path.join(__dirname, '/../../../', 'menu.json'),
      JSON.stringify(menuData, null, 2)
    );
    console.log('Group added successfully.');
  })
  .catch((err) => {
    throw err;
  });
