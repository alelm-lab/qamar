# qamar_app/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('api/words/', views.api_words, name='api_words'),
    path('api/words/<int:word_id>/', views.api_word_detail, name='api_word_detail'),
    path('api/suggestions/', views.api_save_suggestion, name='api_save_suggestion'),
]
