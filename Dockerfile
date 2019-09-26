# Build client app
FROM node:8-alpine as client-build
WORKDIR /client/
COPY ./client/package.json ./client/yarn.lock /client/
RUN yarn
COPY ./client/ /client/
RUN yarn build

# Build production environment
FROM python:3.6-alpine
ENV PYTHONUNBUFFERED 1
WORKDIR /server/
COPY ./server/requirements.txt /server/
RUN \
 apk add --no-cache postgresql-libs && \
 apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
 apk add --no-cache yarn && \
 python -m pip install -r requirements.txt --no-cache-dir && \
 apk --purge del .build-deps
COPY ./server/ /server/

# Copy built assets from client app 
COPY --from=client-build /client/build/ /server/client/build/

WORKDIR /server/
EXPOSE 8000
CMD python /server/manage.py runserver 0.0.0.0:8000
