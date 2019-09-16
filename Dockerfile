FROM python:3.6
ENV PYTHONUNBUFFERED 1
RUN mkdir /dave/
WORKDIR /dave/
COPY requirements.txt /dave/
RUN pip install -r requirements.txt
COPY . /dave/