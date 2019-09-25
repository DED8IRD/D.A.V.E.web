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

WORKDIR /server/client/
COPY ./client/ /server/client/
RUN \
 yarn && \
 yarn build
WORKDIR /server/
RUN \
 export DJANGO_SETTINGS_MODULE=server.settings.production && \
 python manage.py collectstatic --noinput && \
 sh ./utils/init-db.sh
EXPOSE $PORT
CMD python /server/manage.py runserver 0.0.0.0:8000
