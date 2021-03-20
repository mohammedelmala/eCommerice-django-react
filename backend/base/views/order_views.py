from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status


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

        # (2) create shipping address

        # (3) create order items

        # (4) update stock

    

    return Response("Order")
