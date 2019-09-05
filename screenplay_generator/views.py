from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.conf import settings
import os

from DAVE.nlp.Stanley import Stanley as Director

def screenwrite(request):
    genres = ['western']
    characters = ['bob', 'bobby', 'bobra', 'bobert']
    source = f'{settings.BASE_DIR}/{settings.STATIC_URL}/nlp/markov_models'
    director = Director(genres, characters, source)
    director.direct()
    return HttpResponse('ok')

def source_screenplays(request):
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