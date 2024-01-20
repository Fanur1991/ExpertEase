# Основа - Node.js
FROM node:alpine

# Установка рабочего каталога в контейнере
WORKDIR /app

# Копирование файлов проекта
COPY package.json .
COPY yarn.lock .

# Установка зависимостей
RUN yarn install

# Копирование остальных файлов проекта
COPY . .

# Сборка приложения
RUN yarn build

# Запуск приложения
CMD ["yarn", "start"]
