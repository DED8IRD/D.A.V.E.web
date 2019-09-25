"""screenplay_generator url config
"""
from django.urls import path, re_path
from . import views

app_name = 'gen'
urlpatterns = [
    path('screenwrite/', views.screenwrite, name='screenwrite'),
    path('api/sources/', views.source_screenplays, name='source_material'),
    re_path('.*', views.ClientRoute.as_view(), name='client'),
]
