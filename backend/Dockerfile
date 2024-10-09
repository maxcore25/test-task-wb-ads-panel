FROM node:20-alpine AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm && pnpm i

COPY . .

RUN pnpm run build

FROM node:20-alpine AS prod

WORKDIR /app

COPY --from=build /app/dist ./dist

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm && pnpm i --prod --frozen-lockfile

CMD [ "node", "./dist/main.js" ]
