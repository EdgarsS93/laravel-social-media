# Create a fresh Laravel project inside ./src
create:
	rm -f src/.gitkeep
	docker compose run --rm app composer create-project laravel/laravel .
	docker compose run --rm app php artisan storage:link

build:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down

restart:
	docker compose restart

shell:
	docker compose exec app bash

artisan:
	docker compose exec app php artisan $(cmd)

composer:
	docker compose exec app composer $(cmd)

npm:
	docker compose exec app npm $(cmd)

migrate:
	docker compose exec app php artisan migrate

migrate-fresh:
	docker compose exec app php artisan migrate:fresh --seed

vite-restart:
	docker compose restart vite

queue:
	docker compose --profile queue up -d queue

logs:
	docker compose logs -f
