from django.urls import path
from base.views import user_views
from base.views.user_views import MyTokenObtainPairView 


urlpatterns=[
    path('login', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("profile", user_views.getUserProfile, name="user-profile"),
    path("profile/update", user_views.updateUserProfile, name="user-profile-update"),
    path("register", user_views.register, name="register"),
    path("", user_views.getUsers, name="users"),
    path("delete/<str:pk>/",user_views.deleteUser,name="delete-user"),
    path("<str:pk>/", user_views.getUserById,name="user"),
    path("update/<str:pk>/",user_views.updateUser,name="user-update")

]