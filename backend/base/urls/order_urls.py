from django.urls import path
from base.views import order_views


urlpatterns=[
    path('placeorder',order_views.addOrderItems,name="placeorder")
    
]