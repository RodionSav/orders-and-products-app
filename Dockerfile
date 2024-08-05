FROM node:20.12.2

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install -g npm@latest
RUN npm install

COPY . .

RUN mkdir -p .next/cache/webpack/client-development

RUN npm run build

COPY .next ./.next

EXPOSE 3000
EXPOSE 9876

CMD ["npm", "run", "start"]

