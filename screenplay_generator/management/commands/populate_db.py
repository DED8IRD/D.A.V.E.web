from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
import os
import time
from screenplay_generator.models import Film, Genre

class Command(BaseCommand):
    '''
    Django command to create db instances for all the source films located in <path>
    '''

    help = 'Creates db instances for all source films located in /media/<source>/'

    def add_arguments(self, parser):
        parser.add_argument('source', type=str, help='Name of source film directory')

    def handle(self, *args, **kwargs):
        path = kwargs['source']
        root = f'{settings.MEDIA_URL}{path}'
        source = f'{settings.BASE_DIR}/{root}'

        for genre_dir in os.listdir(source):
            start = time.time()
            genre_path = os.path.join(source, genre_dir)
            genre, created = Genre.objects.get_or_create(        
                name=genre_dir
            )

            for screenplay in os.listdir(genre_path):
                title = ' '.join(screenplay[:-5].split('-'))
                film, created = Film.objects.get_or_create(
                    title=title,
                )
                film.file = f'{path}/{genre_dir}/{screenplay}'
                film.genre.add(genre)
                film.save()

            self.stdout.write(f'Finished adding films for {genre.name} in {time.time() - start}s.')
