# Laravel + React Social Media App (Inertia)

Docker environment and app for the Udemy course *Laravel + React: Build a Social Media App with Inertia*.

Stack: Laravel 13, Breeze (React + Inertia), React 19, TypeScript 7, Vite 8, MySQL 8.

## What's inside

| Service   | What it does                          | URL / port              |
|-----------|---------------------------------------|-------------------------|
| `app`     | PHP 8.3-FPM, Composer, Node 22        | -                       |
| `nginx`   | Web server                            | http://localhost:8080   |
| `vite`    | Vite dev server (React hot reload)    | http://localhost:5173   |
| `db`      | MySQL 8                               | localhost:3307          |
| `mailpit` | Catches outgoing emails               | http://localhost:8025   |
| `queue`   | Queue worker (optional, `make queue`) | -                       |

DB credentials: database `laravel`, user `laravel`, password `secret` (root password `root`).
These come from `docker-compose.yml` and override the database settings in `src/.env`.

## Running after a fresh clone

```bash
make build
make up
cp src/.env.example src/.env
make composer cmd="install"
make artisan cmd="key:generate"
make artisan cmd="storage:link"
make migrate
```

The `vite` container runs `npm install` on its own when `node_modules` is missing.
If it started before the steps above finished, run `make vite-restart`.

Open http://localhost:8080.

## Everyday commands

```bash
make up / make down
make shell                         # bash inside the app container
make artisan cmd="make:model Post -m"
make composer cmd="require some/package"
make npm cmd="install some-package"
make migrate / make migrate-fresh
make vite-restart
make logs
make npm cmd="exec tsc"            # TypeScript type check
```

## How this project was set up (notes)

You don't need these steps for a clone. They're here in case you start a new project the same way.

```bash
make build
make create     # fresh Laravel in ./src
make up
make composer cmd="require laravel/breeze --dev"
make artisan cmd="breeze:install react"
```

Breeze is older than Laravel 13, so a few fixes were needed afterwards:

1. **npm install failed (ERESOLVE).** Breeze adds React 18 and `@vitejs/plugin-react` v4, but Laravel 13 uses Vite 8 and React 19. Update them together (not one at a time, and not with `--force`):
   ```bash
   make npm cmd="install -D react@^19 react-dom@^19 @vitejs/plugin-react@latest"
   ```
2. **`Failed to resolve import "./bootstrap"`.** Laravel 13 no longer ships `resources/js/bootstrap.js`, but Breeze's `app.jsx` imports it. Recreate it:
   ```js
   // src/resources/js/bootstrap.js
   import axios from 'axios';
   window.axios = axios;
   window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
   ```
   and run `make npm cmd="install axios"`.
3. **Vite inside Docker.** Add a `server` block to `src/vite.config.js` so the browser can reach the Vite container:
   ```js
   server: {
       host: '0.0.0.0',
       port: 5173,
       hmr: { host: 'localhost' },
       watch: { usePolling: true },
   },
   ```
4. **APP_URL.** Set `APP_URL=http://localhost:8080` in `src/.env` (the default `8000` breaks storage and email links).

5. **Switch to TypeScript.** Breeze installs plain JavaScript (`.jsx`).
   ```bash
   make npm cmd="install -D typescript @types/react @types/react-dom"
   ```
   Rename the `.jsx` files in `src/resources/js` to `.tsx`, and change `.jsx` to `.tsx` in `vite.config.js` (`input`), `app.tsx` (the pages glob) and `resources/views/app.blade.php` (`@vite([...])`).
   Replace `jsconfig.json` with a `tsconfig.json`. TypeScript 7 no longer accepts `baseUrl`, so paths must start with `./`:
   ```json
   {
       "compilerOptions": {
           "target": "ESNext",
           "module": "ESNext",
           "moduleResolution": "bundler",
           "jsx": "react-jsx",
           "strict": true,
           "noEmit": true,
           "skipLibCheck": true,
           "isolatedModules": true,
           "esModuleInterop": true,
           "allowJs": true,
           "paths": { "@/*": ["./resources/js/*"] },
           "types": ["vite/client"]
       },
       "include": ["resources/js/**/*"]
   }
   ```

Then `make vite-restart` and `make migrate`.

Both Tailwind 3 (used by Breeze) and Tailwind 4 (from Laravel) end up installed. That's harmless; Breeze's config uses Tailwind 3.
