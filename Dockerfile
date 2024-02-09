# Base image for a lightweight React application
FROM node:lts-alpine as builder

# Set working directory inside the container
WORKDIR /app

# Copy package dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# Copy application files into the container
COPY . .

EXPOSE 3000

ENTRYPOINT ["npm"]

CMD ["start"]