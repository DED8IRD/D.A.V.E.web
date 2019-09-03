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
    genres = []
    for genre_dir in os.listdir(source):
        genre_path = os.path.join(source, genre_dir)
        genre = {
            'genre': genre_dir,
        }
        films = []
        for screenplay in os.listdir(genre_path):
            name = screenplay.strip('.html')
            films.append({
                'title': ' '.join(name.split('-')),
                'path': f'{root}/{genre_dir}/{screenplay}',
                'genre': genre_dir,
            })
        genre['films'] = films
        genres.append(genre)

    return JsonResponse(genres, safe=False)