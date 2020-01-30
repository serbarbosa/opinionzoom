from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='main-page'),
    path('main', views.index, name='main-page'),
    ]

