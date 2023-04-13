from django.urls import path

from . import views

app_name = 'cola_app'

urlpatterns = [
    path("", views.index, name="index"),
    path("partners", views.partners, name="partners"),
    path('get_cities/', views.get_cities, name='get_cities'),
    path('get_streets/', views.get_streets, name='get_streets'),
    path("map", views.show_map, name="show_map"),
]