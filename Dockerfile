    
FROM node:10

WORKDIR usr/src/app

# ENV PORT 8080
# ENV HOST 0.0.0.0

COPY package*.json ./
RUN npm install

# Copy local angular/nest code to the container
COPY . .

# Build production app
RUN npm run build:ssr

# EXPOSE 4200

CMD ["npm", "run", "serve:ssr"]
