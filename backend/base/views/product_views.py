from django.shortcuts import render
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.core.paginator import Paginator,EmptyPage,PageNotAnInteger

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import status


from base.models import Product,Review
from base.serializers import ProductSerializer, MyTokenObtainPairSerializer, UserSerializer


# get all products
@api_view(["GET"])
def getProducts(request):
    query = request.query_params.get('keyword');
    print(f'query parameter={query}')
    if query == None:
        query=''

    products = Product.objects.filter(name__icontains=query)
    page = request.query_params.get('page')
    paginator = Paginator(products,6)
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
    
    if page == None:
        page=1
    
    page = int(page)

    serializer = ProductSerializer(products,many=True)

    return Response({"products":serializer.data,"page":page,"pages":paginator.num_pages})


@api_view(["GET"])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
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


@api_view(["POST"])
def uploadImage(request):
    print("Uploading")
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)
    product.image = request.FILES.get("image");
    product.save()
    return Response("Product Save")


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createProductReview(request,id):
    user = request.user
    product = Product.objects.get(_id=id)
    data = request.data
    
    # check review does not exist
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content ={
            "detail":"product alredy reviewd"
        }
        return Response(content,status=status.HTTP_400_BAD_REQUEST)
    elif not data.get('rating') or int(data['rating'])== 0:
        content ={
            "detail":"invalid rating"
        }
        return Response(content,status=status.HTTP_400_BAD_REQUEST)

    
    review = Review.objects.create(user=user,
    product=product,
    name= user.username,
    rating=int(data['rating']),
    comments=data['comments']
    )

    

    reviews = product.review_set.all()
    product.numReviews = len(reviews)
    product.rating = sum([r.rating for r in reviews])/len(reviews)
    product.save()
    return Response("Product reviewed success")