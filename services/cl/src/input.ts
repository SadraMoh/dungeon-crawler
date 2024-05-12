import { produce } from "solid-js/store";
import { setWorld, player } from "./state";
import { send } from "./ws";
import { PLAYER_SPEED, createMovePlayerMessage } from "shared";

let isInputBeingHandled = false;

export const keys = {
  a: false,
  d: false,
  w: false,
  s: false,
};

const inputHandler = (e: KeyboardEvent, type: "up" | "down") => {
  const isPressed = type === "down";

  if (e.code === "KeyA") {
    keys.a = isPressed;
  }

  if (e.code === "KeyD") {
    keys.d = isPressed;
  }

  if (e.code === "KeyW") {
    keys.w = isPressed;
  }

  if (e.code === "KeyS") {
    keys.s = isPressed;
  }
};

export const handleInputs = () => {
  window.addEventListener("keydown", (e) => inputHandler(e, "down"));
  window.addEventListener("keyup", (e) => inputHandler(e, "up"));
  isInputBeingHandled = true;
};

addEventListener("update", () => {
  if (isInputBeingHandled === false) {
    return;
  }

  const maybePlayer = player();
  if (!maybePlayer) {
    return;
  }

  // don't send socket requests or update the ui if no input is pressed
  if (Object.values(keys).every((isPressed) => isPressed === false)) {
    return;
  }

  setWorld(
    "players",
    produce((players) => {
      const playerIndex = players.findIndex((p) => p.name === maybePlayer.name);

      let x = 0;
      let y = 0;

      if (keys.a) {
        players[playerIndex].x -= PLAYER_SPEED;
        x = -1;
      } else if (keys.d) {
        players[playerIndex].x += PLAYER_SPEED;
        x = 1;
      }

      if (keys.w) {
        players[playerIndex].y -= PLAYER_SPEED;
        y = -1;
      } else if (keys.s) {
        players[playerIndex].y += PLAYER_SPEED;
        y = 1;
      }

      send(createMovePlayerMessage(maybePlayer.name, x, y));
    })
  );
});
