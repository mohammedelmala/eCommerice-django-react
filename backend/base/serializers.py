from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Order, OrderItem, ShippingAddress, Review
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.serializers import RefreshToken

class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Product
        fields ='__all__'
    

    def get_reviews(self,obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews,many=True)
        return serializer.data


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields =  '__all__'


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model= Order
        fields = '__all__'
    
    def get_orderItems(self,obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items,many=True)
        return serializer.data
    
    def get_shippingAddress(self,obj):
        

        print("order id:",obj._id)
        # print("shipping address:",obj.shippingAddress_set.all())
        print("payment method:",obj.paymentMethod)
        print("tax price:",obj.taxPrice)
        print("shipping price:",obj.shippingPrice)
        print("total price:",obj.totalPrice)
        print("is paid:",obj.isPaid)
        print("paid at:",obj.paidAt)
        print("is delivered:",obj.isDelivered)
        print("delivered at:",obj.deliveredAt)
        print("created at:",obj.createdAt)

        try:
            # address = ShippingAddressSerializer(obj.ShippingAddress(), many=False).data
            address = True

        except:
            address =False
        
        return address
    

    def get_user(self,obj):
        user = obj.user
        serializer = UserSerializer(user,many=False)
        return serializer.data



class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
    
        fields =  ["id","username","email","name","_id","isAdmin"]
    

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


