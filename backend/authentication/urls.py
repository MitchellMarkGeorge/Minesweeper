from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import SignUpView, SignOutView

urlpatterns = [
    path('user/signup/', SignUpView.as_view(), name="signup_user"),
    path('user/signout/', SignOutView.as_view(), name="signout_user"),
    path('token/', TokenObtainPairView.as_view(), name="get_token"),
    path('token/refresh/', TokenRefreshView.as_view(), name="refresh_token")
]
