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

@api_view(["POST"])
@permission_classes([IsAdminUser])
def createProduct(request):
    print("Create Product")
    user = request.user
    product = Product.objects.create(
        user=user,
        name="sample",
        price=0,
        brand="sample brand",
        countInStock=0,
        category="sample category",
        description=""
    )
    serializer = ProductSerializer(product,many=False)
    return Response(serializer.data)
    # return Response("success")

@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateProduct(request,pk):
    user = request.user
    data = request.data
    product = Product.objects.get(_id=pk)
    product.name = data["name"]
    product.price = data["price"]
    product.brand = data["brand"]
    product.countInStock = data["countInStock"]
    product.category = data["category"]
    product.description = data["description"]
    product.save()
    serializer = ProductSerializer(product,many=False)

    return Response(serializer.data)


@api_view(["GET"])
def getInfo(request):
    user = request.user
    return Response(f"Success {user.username}")

@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response("Product Deleted")
