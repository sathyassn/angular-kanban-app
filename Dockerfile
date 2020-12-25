FROM node:12

WORKDIR usr/src/app

COPY package*.json ./
RUN npm install

# Copy local code to the container
COPY . .

RUN npm run build:ssr

CMD ["npm", "run", "serve:ssr"]


