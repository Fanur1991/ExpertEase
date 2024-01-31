# Используйте официальный образ Node.js в качестве базового образа
FROM node:latest as build

# Установите рабочий каталог в контейнере
WORKDIR /app

# Копируйте файлы package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Установите зависимости проекта
RUN npm install

# Копируйте оставшиеся файлы проекта
COPY . .

# Соберите приложение для продакшена
RUN npm run build

# Используйте nginx для раздачи собранного приложения
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Откройте 80 порт и запустите nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
