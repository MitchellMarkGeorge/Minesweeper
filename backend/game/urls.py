
from django.urls import path
from .views import CreateGameView, GetGameView, RevealGameTileView, FlagGameTileView

urlpatterns = [
    path("new_game/", CreateGameView.as_view(), name="create_new_game"),
    path("<uuid:game_id>/", GetGameView.as_view(), name="get_game"),
    path("<uuid:game_id>/reveal", RevealGameTileView.as_view(), name="reveal_tile"),
    path("<uuid:game_id>/flag", FlagGameTileView.as_view(), name="flag_tile"),
]
