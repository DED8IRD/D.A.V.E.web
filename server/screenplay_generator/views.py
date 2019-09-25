from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse, FileResponse
from django.conf import settings
from django.views.generic.base import TemplateView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
import json
import os
from .models import Film, Genre
from DAVE.nlp.Stanley import Stanley as Director

class ClientRoute(TemplateView):
    template_name = "index.html"

    @method_decorator(ensure_csrf_cookie)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)


def screenwrite(request):
    '''
    Generates formatted screenplay as PDF and plaintext files
    '''
    if request.method == 'POST':
        data = json.loads(request.body)
        title = data['title'].replace(':', '-') or 'Untitled'
        author = data['screenwriter'] or 'Anonymous'
        characters = data['characters']
        films = data['sources']
        sources = [get_object_or_404(Film, pk=film['id']).file.path 
                   for title, film in films.items()]

        temp_dir = os.path.join('gen', 'temp')
        destination = os.path.join(settings.MEDIA_ROOT, temp_dir)
        director = Director(
            sources, 
            characters, 
            destination=destination, 
            title=title,
            author=author)
        director.direct(length=100)
        data['generated'] = {
            'pdf': f'{settings.MEDIA_URL}{temp_dir}/{title}.pdf',
            'plaintext': f'{settings.MEDIA_URL}{temp_dir}/{title}.txt',
        }
        return JsonResponse(data)
    return HttpResponse(status=400)


def source_screenplays(request):
    '''
    Serializes films
    '''
    films = Film.objects.all()
    source = {}
    for film in films:
        genres = film.genre.all()
        source[film.title] = {
            'genre': [genre.name for genre in genres],
            'id': film.pk
        }
    return JsonResponse(source)


def raw_path_api(request, path):
    '''
    Serializes all files in path
    '''
    root = f'{settings.STATIC_URL}{path}'
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