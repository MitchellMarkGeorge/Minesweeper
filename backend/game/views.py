from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CreateGameSerializer
from rest_framework.permissions import IsAuthenticated


class CreateGameView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CreateGameSerializer(data=request.data)
        if serializer.is_valid():
            game = serializer.save(user=request.user)
            return Response(game, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)