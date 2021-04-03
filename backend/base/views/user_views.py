from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import status

from rest_framework.response import Response
from base.serializers import MyTokenObtainPairSerializer, UserSerializer, UserSerializerWithToken

from rest_framework_simplejwt.views import TokenObtainPairView

# get current user
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)

# get current user
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user,many=False)

    data = request.data
    user.first_name = data['name']
    user.username = data['name']
    user.email = data['email']
    if data['password']!='':
        user.password = make_password(data['password'])
    
    user.save()
    return Response(serializer.data)



@api_view(["GET"])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializar = UserSerializer(users,many=True)
    return  Response(serializar.data)




@api_view(["POST"])
def register(request):
    try:
        data = request.data
        user = User.objects.create(
        first_name=data["name"],
        username =data["email"],
        email = data["email"], 
        password = make_password(data["password"]),
        is_staff= True
        )
        serializar = UserSerializer(user,many=False)
        return  Response(serializar.data,status=status.HTTP_200_OK)
    except:
        message = {
            "details":"User alredy exists"
        }
        return Response(message,status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def deleteUser(request,pk):
    user = User.objects.get(id=pk)
    user.delete()
    return Response("User deleted successfully.")

@api_view(["GET"])
# @permission_classes([IsAdminUser])
def getUserById(request,pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)
   




@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateUser(request,pk):
    user = User.objects.get(id=pk)
    data = request.data

    user.first_name = data["name"]
    user.username = data["email"]
    user.email = data["email"]
    user.is_staff = data["isAdmin"]

    user.save()
    
    serializer = UserSerializer(user,many=False)

    return Response(serializer.data)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer