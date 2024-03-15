from django.urls import path
from . import views
from .views import UserCreate
from .views import get_business_types
from .views import login_view
from .views import UserRegistrationView, UserLoginView



#from templates_generator.views import generate_text


urlpatterns = [
    #path('', views.newHome, name='newHome'),
    path('', views.home, name='home'),
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('login/', UserLoginView.as_view(), name='user-login'),

    path('signup/', UserCreate.as_view(), name='signup'),
    path('api/login/', login_view, name='login'),
    path('api/business_types/', get_business_types, name='get_business_types'),

    path('generate/restaurant_template/index.html', views.index_view, name='index'),
    path('generate/restaurant_template/menu.html', views.menu_view, name='menu'),
    path('generate/restaurant_template/about.html', views.about_view, name='about'),
    path('generate/restaurant_template/book.html', views.book_view, name='book'),

    path('generate/', views.generate_template, name='generate_template'),
    #path('generate-text/',views.generate_text, name='generate_text'),
    #path('generate-text/', generate_text, name='generate_text'),
]


