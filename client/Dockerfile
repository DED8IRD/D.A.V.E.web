FROM node:8
RUN mkdir /client/
WORKDIR /client/
COPY package.json yarn.lock /client/
RUN yarn
COPY . /client/
EXPOSE 3000
CMD yarn start --watch