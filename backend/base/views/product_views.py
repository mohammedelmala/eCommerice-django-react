from django.shortcuts import render
from rest_framework.response import Response
from django.contrib.auth.models import User

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import status


from base.models import Product
from base.serializers import ProductSerializer, MyTokenObtainPairSerializer, UserSerializer


# get all products
@api_view(["GET"])
def getProducts(request):
    
    products = Product.objects.all()
    serializer = ProductSerializer(products,many=True)
    return Response(serializer.data)


# get all products
@api_view(["GET"])
def getProduct(request,pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product,many=False)
    return Response(serializer.data)
