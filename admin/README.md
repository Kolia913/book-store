# Admin template

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## CLI

### Generate menu file if not exists

```sh
node console.js create:menu
```

### Add menu group

```sh
node console.js add:menu-group
```

💡Hint: Leave empty field `key` if item should not have a unique key

### Add menu item

```sh
node console.js add:menu-item
```

💡Hint: Leave empty field `groupKey` if item should not be inside of a group

💡Hint: Leave empty field `key` if item should not have a unique key

💡Hint: Leave empty field `icon` if item should not have an icon (Experimental!)

### Create CRUD store

```sh
node console.js create:store
```

💡Hint: `file_name` param can contain directory structure: `<dir>/<storeName>`

💡Hint: If you do not need extra state or extra actions, leave param `customizable` empty. In case you need them, feel free to write anything here, maybe, it can be a beautifull poem...

## Icons

`Find icons here: https://oh-vue-icons.js.org/`
