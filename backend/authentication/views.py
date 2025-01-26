from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import SignupSerializer, SignOutSerializer, LoginSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib import auth


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]

            user = auth.authenticate(username=username, password=password)

            if not user:
                return Response(
                    {"error": "invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
                )

            refresh_token = RefreshToken.for_user(user=user)

            return Response({
                "user_id": user.id,
                "username": username,
                "refresh_token": str(refresh_token),
                "access_token": str(refresh_token.access_token),
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignUpView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            # should this be .create()?
            user = serializer.save()
            refresh_token = RefreshToken.for_user(user)
            return Response(
                {
                    "user_id": user.id,
                    "username": user.username,
                    "refresh_token": str(refresh_token),
                    "access_token": str(refresh_token.access_token),
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignOutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = SignOutSerializer(data=request.data)
        if serializer.is_valid():
            refresh_token = serializer.validated_data["refresh_token"]
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
                return Response(status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
