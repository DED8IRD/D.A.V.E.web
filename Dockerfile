FROM python:3.6-alpine
ENV PYTHONUNBUFFERED 1
WORKDIR /server/
COPY . /server/

WORKDIR /client/
COPY . /server/client/

WORKDIR /server/
RUN pip install -r requirements.txt \
  DJANGO_SETTINGS_MODULE=server.settings.production \
  SECRET_KEY=$SECRET_KEY \
  python server/manage.py collectstatic --noinput \
  cd ./client/ \
  yarn
EXPOSE $PORT
CMD python server/manage.py runserver 0.0.0.0:$PORT
