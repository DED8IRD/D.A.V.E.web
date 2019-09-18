# production.py
from server.settings.base import *
import os

SECRET_KEY = os.environ.get("SECRET_KEY")
DEBUG = False
ALLOWED_HOSTS = [os.environ.get("PRODUCTION_HOST")]

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'HOST': 'db',
        'PORT': 5432,
    }
}

# Templates
TEMPLATES[0]["DIRS"] = [os.path.join(BASE_DIR, "..", "client", "build")]

# Staticfiles
STATICFILES_DIRS = [os.path.join(BASE_DIR, "..", "client", "build", "static")]
STATIC_ROOT = os.path.join(BASE_DIR, "static")
STATIC_URL = "/static/"
