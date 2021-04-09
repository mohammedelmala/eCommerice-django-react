from django.urls import path
from base.views import product_views


urlpatterns=[
    path("", product_views.getProducts, name="products"),
    path("create/", product_views.createProduct, name="product-create"),
    path("upload/image/", product_views.uploadImage, name="product-create"),
    path("update/<str:pk>/", product_views.updateProduct, name="product-create"),
    path("top/", product_views.getTopProducts, name="top-product"),
    path("<str:pk>/", product_views.getProduct, name="product"),
    path("delete/<str:pk>/", product_views.deleteProduct, name="product-delete"),
    path("review/<str:id>/", product_views.createProductReview, name="product-review"),
]

