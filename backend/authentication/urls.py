from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import SignUpView, SignOutView, LoginView

urlpatterns = [
    path('user/signup/', SignUpView.as_view(), name="signup_user"),
    path('user/signout/', SignOutView.as_view(), name="signout_user"),
    path('user/login/', LoginView.as_view(), name="login_user"),
    path('token/refresh/', TokenRefreshView.as_view(), name="refresh_token")
]
