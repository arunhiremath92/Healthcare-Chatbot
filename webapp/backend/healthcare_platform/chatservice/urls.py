from django.urls import path
from chatservice import views

urlpatterns = [
    path('chatservice/', views.chatservice_list),
    path('chatservice/<int:pk>/', views.chatservice_detail),
]
