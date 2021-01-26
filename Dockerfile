FROM node:15

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

WORKDIR /usr/src/app
COPY package.json yarn.lock ./

RUN set -ex; \
  if [ "$NODE_ENV" = "production" ]; then \
  yarn install --no-cache --frozen-lockfile --production; \
  else \
  touch yarn-error.log; \
  mkdir -p -m 777 node_modules /home/node/.cache/yarn; \
  yarn; \
  chown -R node:node node_modules package.json yarn.lock yarn-error.log /home/node/.cache/yarn; \
  fi;

COPY knexfile.js ./
COPY src ./src/

USER node
EXPOSE 3000

CMD [ "npm", "start" ]
