from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='main-page'),
    path('main', views.index, name='main-page'),
    path('main/search', views.searchQuery, name='search-page'),
    path('main/enelvo', views.runEnelvo, name='enelvo-page'),
    path('main/qltFilter', views.runQltFilter, name='qltFilter-page'),
    path('main/sbjFilter', views.runSbjFilter, name='sbjFilter-page'),
    path('main/aspect', views.runAspect, name='aspect-page'),
    path('main/opizer', views.runOpizer, name='opizer-page'),
    ]

