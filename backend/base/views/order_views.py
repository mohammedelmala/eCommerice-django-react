from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

from base.models import Order, ShippingAddress, OrderItem, Product


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

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
            product = Product.objects.get(id=item.product)
            orderItem = OrderItem.objects.create(
            product = product,
            user = user,
            name = item.name,
            qty = item.qty,
            price = item.price,
            image = item.image
            )

        # (4) update stock

    

    return Response("Order")
