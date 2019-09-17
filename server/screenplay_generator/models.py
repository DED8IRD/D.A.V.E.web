from django.db import models

class Person(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)

    def __str__(self):
        return self.full_name

    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}'


class Genre(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
        

class Film(models.Model):
    title = models.CharField(max_length=100)
    file = models.FileField()
    writer = models.ManyToManyField(Person, related_name='wrote')
    director = models.ManyToManyField(Person, related_name='directed')
    cast = models.ManyToManyField(Person, related_name='acted')
    genre = models.ManyToManyField(Genre, related_name='films')

    def __str__(self):
        return self.title
