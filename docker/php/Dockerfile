FROM php:8.3-fpm

# System packages + libraries for PHP extensions
RUN apt-get update && apt-get install -y \
    git curl zip unzip \
    libpng-dev libjpeg62-turbo-dev libfreetype6-dev libwebp-dev \
    libonig-dev libxml2-dev libzip-dev libicu-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip intl

# Node.js 22 (needed for React/Vite and starter kit installers)
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Laravel installer (for `laravel new`)
ENV COMPOSER_HOME=/composer PATH="/composer/vendor/bin:${PATH}"
RUN composer global require laravel/installer

COPY php.ini /usr/local/etc/php/conf.d/custom.ini

WORKDIR /var/www
