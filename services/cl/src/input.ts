import { produce } from "solid-js/store";
import { setWorld, player } from "./state";
import { send } from "./ws";
import { createMovePlayerMessage } from "shared";

const inputHandler = (e: KeyboardEvent) => {
  setWorld(
    "players",
    produce((players) => {
      const maybePlayer = player();

      if (!maybePlayer) {
        return;
      }

      const playerIndex = players.findIndex((p) => p.name === maybePlayer.name);

      if (e.code === "KeyA") {
        players[playerIndex].x -= 5;
      } else if (e.code === "KeyD") {
        players[playerIndex].x += 5;
      }

      if (e.code === "KeyW") {
        players[playerIndex].y -= 5;
      } else if (e.code === "KeyS") {
        players[playerIndex].y += 5;
      }

      send(
        createMovePlayerMessage(maybePlayer.name, maybePlayer.x, maybePlayer.y)
      );
    })
  );
};

export const handleInputs = () =>
  window.addEventListener("keydown", inputHandler);
