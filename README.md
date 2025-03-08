# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Database

### Environment

Please, copy .env.example -> .env and adjust ur environment

### Start db

1. Install docker
2. Start docker daemon
3. Give exec permission start file: `sudo chmod +x ./start_services.sh`
4. Run start file `./start_services.sh`
5. Congrats now your db is running on localhost:5432

### Run migrations

1. Ensure node_modules are installed
2. Ensure u have npx utility
3. Run: `npx sequelize-cli db:migrate`

### Seed database

1. Ensure node_modules are installed
2. Ensure u have npx utility
3. Check if ur .env file is filled
4. Run `npx sequelize-cli db:seed:all`

### Create migration

`npx sequelize-cli migration:generate --name <migration-name>`

### Create seeder

`npx sequelize-cli seed:generate --name demo-user`
