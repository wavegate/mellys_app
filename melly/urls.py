from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('updateLastFed/', views.updateLastFed, name='updateLastFed'),
    path('updateLastPooped/', views.updateLastPooped, name='updateLastPooped'),
]