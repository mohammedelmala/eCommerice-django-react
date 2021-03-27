from django.urls import path
from base.views import order_views


urlpatterns=[
    path('add/',order_views.addOrderItems,name="placeorder"),
    path('',order_views.getOrders,name="orders"),
    path('myorders/',order_views.getMyOrders,name="my-orders"),
    path('<str:id>/',order_views.getOrderById,name="user-order"),
    path('<str:id>/pay/',order_views.updateOrderToPaid,name="pay-order")
]