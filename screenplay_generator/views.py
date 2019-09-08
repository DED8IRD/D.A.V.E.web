from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.conf import settings
import json
import os

from .models import Film, Genre
from DAVE.nlp.Stanley import Stanley as Director

def screenwrite(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        title = data['title'] or 'Untitled'
        author = data['screenwriter'] or 'Anonymous'
        characters = data['characters']
        films = data['sources']
        sources = [get_object_or_404(Film, pk=film['id']).file.path 
                   for title, film in films.items()]
        temp_dir = os.path.join(settings.MEDIA_ROOT, 'temp')
        if not os.path.exists(temp_dir):
            os.makedirs(temp_dir)
        director = Director(
            sources, 
            characters, 
            destination=temp_dir, 
            title=title,
            author=author)
        director.direct(length=100)
        return JsonResponse(data)

    return HttpResponse('ok')


def source_screenplays(request):
    films = Film.objects.all()
    source = {}
    for film in films:
        genres = film.genre.all()
        source[film.title] = {
            'genre': [genre.name for genre in genres],
            'id': film.pk
        }
    return JsonResponse(source)


def raw_path_api(request):
    root = f'{settings.STATIC_URL}scraper/Genres'
    source = f'{settings.BASE_DIR}/{root}'
    films = {}
    for genre_dir in os.listdir(source):
        genre_path = os.path.join(source, genre_dir)
        for screenplay in os.listdir(genre_path):
            title = ' '.join(screenplay[:-5].split('-'))
            film = films.get(title, {
                'path': f'{root}/{genre_dir}/{screenplay}',
                'genre': []
            })
            film['genre'] += [genre_dir]
            films[title] = film
    return JsonResponse(films)