FROM python:3.6-alpine
ENV PYTHONUNBUFFERED 1
RUN mkdir /server/
WORKDIR /server/
COPY requirements.txt /server/
# required to install psycopg / postgres in alpine
RUN \
 apk add --no-cache postgresql-libs && \
 apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
 python -m pip install -r requirements.txt --no-cache-dir && \
 apk --purge del .build-deps 
COPY . /server/
EXPOSE 8000
CMD python manage.py runserver 0.0.0.0:8000