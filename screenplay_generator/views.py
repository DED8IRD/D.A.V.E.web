from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings

from DAVE.nlp.Stanley import Stanley as Director

def screenwrite(request):
    genres = ['western']
    characters = ['bob', 'bobby', 'bobra', 'bobert']
    source = f'{settings.BASE_DIR}/{settings.STATIC_URL}/nlp/markov_models'
    print(source)
    director = Director(genres, characters, source)
    director.direct()
    return HttpResponse('ok')
