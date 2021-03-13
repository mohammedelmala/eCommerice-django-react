from django.urls import path
from base.views import user_views
from base.views.user_views import MyTokenObtainPairView 


urlpatterns=[
    path('login', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("profile", user_views.getUserProfile, name="user"),
    path("register", user_views.register, name="register"),
    path("", user_views.getUsers, name="users"),
]