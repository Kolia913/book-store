/* eslint-disable no-undef */
// add-menu-group.js
const fs = require('node:fs');
const prompt = require('prompt');
const path = require('node:path');
const { promisify } = require('node:util');
const colors = require('@colors/colors/safe');

const getInput = promisify(prompt.get);
console.log(
  "Welcome to menu generator. Please fill some fields and I will create menu item for you:) P.S. Fields 'key' and 'icon' are optional ;)\n" +
    'Feel free to leave group key empty if item should be on a top level of menu.'
);
prompt.start({
  message: colors.rainbow('item'),
});
getInput(['groupKey', 'title', 'link', 'icon', 'key'])
  .then((result) => {
    const menuItem = {
      isGroup: false,
      title: result.title,
      link: result.link,
      icon: result.icon,
      key: result?.key ? result.key : null,
    };
    if (!menuItem.title || !menuItem.link) {
      console.error('Please provide item title and link.');
      process.exit(1);
    }

    const menuData = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../../', 'menu.json')));

    const groupIndex = menuData.findIndex(
      (item) => item.key === result.groupKey && item.key !== null
    );
    if (groupIndex >= 0) {
      menuData[groupIndex]?.subItems?.push(menuItem);
    } else {
      const existingItem = menuData.find((item) => item.key === result.key && item.key !== null);
      if (!existingItem) {
        menuData.push(menuItem);
      } else {
        console.error('Key already exists! Please enter a unique key');
        process.exit(1);
      }
    }

    fs.writeFileSync(
      path.join(__dirname, '/../../../', 'menu.json'),
      JSON.stringify(menuData, null, 2)
    );
    console.log('Item added successfully.');
  })
  .catch((err) => {
    throw err;
  });
