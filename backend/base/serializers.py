from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.serializers import RefreshToken

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields ='__all__'


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
    
        fields =  ["id","username","EMAIL_FIELD","name","_id","isAdmin"]
    

    def get_name(self,obj):
        name = obj.username
        return name
    
    def get__id(self,obj):
        _id = obj.id
        return _id
    
    def get_isAdmin(self,obj):
        return obj.is_staff



class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=User
        fields = ["id","username","email","password","name","_id","isAdmin","token"]
    
    def get_token(self,obj):
         token = RefreshToken.for_user(obj)
         return str(token.access_token)
    


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    def validate(self,attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        

        for k,v in serializer.items():
            data[k]=v
        
        return data

