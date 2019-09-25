# production.py
from server.settings.base import *
from .utils.secrets import KEYS

SECRET_KEY = KEYS['django']
DEBUG = False
ALLOWED_HOSTS = ['server', '192.168.99.100']

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),    
        # 'ENGINE': 'django.db.backends.postgresql',
        # 'NAME': 'DAVE',
        # 'USER': KEYS['postgres']['USER'],
        # 'PASSWORD': KEYS['postgres']['PASSWORD'],
        # 'HOST': 'localhost',
        # 'PORT': '',
    }
}

# Templates
TEMPLATES[0]["DIRS"] = [os.path.join(BASE_DIR, "client", "build")]

# Staticfiles
STATICFILES_DIRS = [os.path.join(BASE_DIR, "client", "build", "static")]
STATIC_ROOT = os.path.join(BASE_DIR, "static")
STATIC_URL = "/static/"
