# development.py
from server.settings.base import *
from utils.secrets import KEYS

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = KEYS['django']
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
ALLOWED_HOSTS = ['server', '192.168.99.100', '192.168.99.101']

# Apps
INSTALLED_APPS = [*INSTALLED_APPS, 'corsheaders'] 

# Middleware
MIDDLEWARE = ['corsheaders.middleware.CorsMiddleware', *MIDDLEWARE]

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'HOST': 'db',
        'PORT': 5432,
    }
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/
STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'client', 'build', 'static'),
    os.path.join(BASE_DIR, 'static'),
)

# CORS whitelist
CORS_ORIGIN_WHITELIST = (
    "http://localhost:8000",
    "http://localhost:3000",
)