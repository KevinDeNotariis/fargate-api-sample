FROM node:lts-alpine as builder

WORKDIR /opt/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:slim

ENV NODE_ENV production

WORKDIR /opt/app

COPY package*.json ./

RUN npm ci --production

USER node
COPY --chown=node:node --from=builder /opt/app/dist ./dist

ENV PORT 80
ENV API_KEY ${API_KEY}
ENV STRINGS_MAPPING_PARAMETER_NAME ${STRINGS_MAPPING_PARAMETER_NAME}
ENV AWS_REGION ${AWS_REGION}

EXPOSE 80

CMD ["node", "dist/app.js"]