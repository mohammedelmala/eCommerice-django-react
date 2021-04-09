from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

from base.models import Order, ShippingAddress, OrderItem, Product
from base.serializers import OrderSerializer
from datetime import datetime

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']
    validation = isOrderValid(data)

    if not orderItems or len(orderItems) ==0 :
        return Response({"detail":"No order items","status":status.HTTP_400_BAD_REQUEST})
    else:
        # (1) create order
        order = Order.objects.create(user=user,
        paymentMethod=data['paymentMethod'],
        taxPrice = data['taxPrice'],
        shippingPrice = data['shippingPrice'],
        totalPrice = data['totalPrice']
        )

        # (2) create shipping address

        shippingAddress = ShippingAddress.objects.create(order = order ,
        address=data['shippingAddress']['address'],
        city= data['shippingAddress']['city'],
        postalCode= data['shippingAddress']['postalCode'],
        country= data['shippingAddress']['country'],
        shippingPrice=data['shippingPrice']

        )
    

        # (3) create order items

        for item in orderItems:

            product = Product.objects.get(_id=item['product'])
            orderItem = OrderItem.objects.create(
            product = product,
            user = user,
            order = order,
            name = product.name,
            qty = item['qty'],
            price = item['price'],
            image = item['image']
            )
            # (4) update stock
            product.countInStock -= int(item['qty'])
            product.save()
            
        
        serializer = OrderSerializer(order,many=False)
        return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getOrderById(request,id):
    try:
        user = request.user
        order = Order.objects.get(_id=id)
        if order.user == user or user.is_staff:
            serializer = OrderSerializer(order,many=False)
            return Response(serializer.data)
        else:
           return Response({"detail":"Not Authorized to view this orders"},status=status.HTTP_400_BAD_REQUEST) 
    except:
        return Response({"detail":"Order does not exist"},status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request,id):
    order = Order.objects.get(_id=id)
    order.isPaid = True
    order.paidAt = datetime.now()

    order.save()
    return Response("Order paid")

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request,id):
    order = Order.objects.get(_id=id)
    order.isDelivered = True
    order.deliveredAt = datetime.now()

    order.save()
    return Response("Order Delivered")


# def isOrderValid(data):
#     print(type(data))
#     order = dict(data)
#     # orderItems = data['orderItems']
#     # print(orderItems)

#     # for item in orderItems:
#     #     try:
#     #         product = Product.objects.get(_id=item['product'])
#     #         if product.countInStock < item['qty']:
#     #             return f"Item ${product['product']} does not available now"
#     #     except:
#     #         return f"Invalid product ${item['product']}"
    
#     return "Y"


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data)

        