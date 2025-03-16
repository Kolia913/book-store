/* eslint-disable no-undef */
// create-menu.js
const fs = require('node:fs');
const path = require('node:path');

const menuData = [
  {
    icon: 'md-dashboard',
    isGroup: false,
    title: 'Dashboard',
    link: '/',
  },
];

if (!fs.existsSync(path.join(__dirname, '/../../../', 'menu.json'))) {
  fs.writeFileSync(
    path.join(__dirname, '/../../../', 'menu.json'),
    JSON.stringify(menuData, null, 2)
  );
  console.log('Menu file created successfully.');
} else {
  console.log('Menu file already exists.');
}
