# Laravel + React Social Media App (Inertia)

Docker environment for the Udemy course *Laravel + React: Build a Social Media App with Inertia*.

## What's inside

| Service   | What it does                          | URL / port              |
|-----------|---------------------------------------|-------------------------|
| `app`     | PHP 8.3-FPM, Composer, Node 22        | -                       |
| `nginx`   | Web server                            | http://localhost:8080   |
| `vite`    | Vite dev server (React hot reload)    | http://localhost:5173   |
| `db`      | MySQL 8                               | localhost:3307          |
| `mailpit` | Catches outgoing emails               | http://localhost:8025   |
| `queue`   | Queue worker (optional, `make queue`) | -                       |

Ports differ from `laravel-learning` (8000 / 3306), so both projects can run at the same time.

DB credentials: database `laravel`, user `laravel`, password `secret` (root password `root`).

## First-time setup

```bash
make build      # build the PHP/Node image
make create     # create a fresh Laravel project in ./src
make up         # start everything
make migrate
```

Then install the starter kit the course uses, for example Breeze with React:

```bash
make composer cmd="require laravel/breeze --dev"
make artisan cmd="breeze:install react"
```

If the course uses a different installer (e.g. `laravel new`), run it from `make shell`.

### Make Vite work inside Docker (required once)

Add a `server` block to `src/vite.config.js` so the browser can reach the Vite container:

```js
export default defineConfig({
    plugins: [ /* keep what the installer generated */ ],
    server: {
        host: '0.0.0.0',
        port: 5173,
        hmr: { host: 'localhost' },
        watch: { usePolling: true },
    },
});
```

Then run `make vite-restart`.

## Everyday commands

```bash
make up / make down
make shell                         # bash inside the app container
make artisan cmd="make:model Post -m"
make composer cmd="require some/package"
make npm cmd="install some-package"
make migrate / make migrate-fresh
make logs
```
