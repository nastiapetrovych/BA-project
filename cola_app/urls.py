from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    # path("form", views.form, name="login"),
    # path("map", views.map, name="logout"),
]