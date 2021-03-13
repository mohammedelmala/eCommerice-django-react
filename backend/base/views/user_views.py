from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import status

from rest_framework.response import Response
from base.serializers import MyTokenObtainPairSerializer, UserSerializer

from rest_framework_simplejwt.views import TokenObtainPairView

# get current user
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user,many=False)
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
        password = make_password(data["password"])
        )
        serializar = UserSerializer(user,many=False)
        return  Response(serializar.data,status=status.HTTP_200_OK)
    except:
        message = {
            "details":"User alredy exists"
        }
        return Response(message,status=status.HTTP_400_BAD_REQUEST)





class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer