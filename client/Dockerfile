FROM node:8-alpine
WORKDIR /client/
COPY package.json yarn.lock /client/
RUN yarn
COPY . /client/
EXPOSE 3000
CMD yarn start --watch