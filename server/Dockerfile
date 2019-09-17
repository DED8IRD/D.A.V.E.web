FROM python:3.6
ENV PYTHONUNBUFFERED 1
RUN mkdir /server/
WORKDIR /server/
COPY requirements.txt /server/
RUN pip install -r requirements.txt
COPY . /server/
EXPOSE 8000
CMD python manage.py runserver 0.0.0.0:8000