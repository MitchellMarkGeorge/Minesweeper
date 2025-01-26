from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import CreateGameSerializer, TileCoordinateSerializer
from .models import Game
from .board import MinesweeperBoard


def get_game_response_data(game, sanitized_board):
    return {
        "id": game.id,
        "num_of_rows": game.num_of_rows,
        "num_of_cols": game.num_of_cols,
        "num_of_mines": game.num_of_mines,
        "difficulty": game.difficulty,
        "status": game.status,
        "board": sanitized_board,
    }


class CreateGameView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CreateGameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            # game object is not needed as the front end will get it after
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetGameView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, game_id):
        try:
            game = Game.objects.get(id=game_id, user=request.user)
            board = MinesweeperBoard.from_game(game)

            sanitized_board = board.get_sanitized_board()
            # does the game object here need to serialized???
            return Response(
                get_game_response_data(game, sanitized_board), status=status.HTTP_200_OK
            )
        except Game.DoesNotExist:
            return Response(
                {"error": "Game not found"}, status=status.HTTP_404_NOT_FOUND
            )


class RevealGameTileView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, game_id):
        serializer = TileCoordinateSerializer(data=request.data)
        if serializer.is_valid():
            try:
                game = Game.objects.get(id=game_id, user=request.user)
                board = MinesweeperBoard.from_game(game)
                did_reveal_tile = board.reveal_title(
                    row=request.data["row"], col=request.data["col"]
                )

                hit_mine = not did_reveal_tile

                # is the player hit a mine, all the mines should be revealed
                # and the game status updated
                if hit_mine:
                    board.reveal_all_mines()
                    game.status = Game.GameStatus.LOST
                    sanitized_board = board.get_sanitized_board()
                    game.board = board.get_board_state()
                    game.save()
                    return Response(
                        get_game_response_data(game, sanitized_board),
                        status=status.HTTP_200_OK,
                    )

                has_won = board.check_has_won()

                # if the player has won the game, update the game status
                if has_won:
                    game.status = Game.GameStatus.WON
                    sanitized_board = board.get_sanitized_board()
                    game.board = board.get_board_state()
                    game.save()
                    return Response(
                        get_game_response_data(game, sanitized_board),
                        status=status.HTTP_200_OK,
                    )

            except Game.DoesNotExist:
                return Response(
                    {"error": "Game not found"}, status=status.HTTP_404_NOT_FOUND
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FlagGameTileView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, game_id):
        serializer = TileCoordinateSerializer(data=request.data)
        if serializer.is_valid():
            try:
                game = Game.objects.get(id=game_id, user=request.user)
                board = MinesweeperBoard.from_game(game)
                board.flag_tile(row=request.data["row"], col=request.data["col"])

                sanitized_board = board.get_sanitized_board()
                game.board = board.get_board_state()
                game.save()
                return Response(
                    get_game_response_data(game, sanitized_board),
                    status=status.HTTP_200_OK,
                )

            except Game.DoesNotExist:
                return Response(
                    {"error": "Game not found"}, status=status.HTTP_404_NOT_FOUND
                )
            except ValueError as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
