import type { ServerWebSocket } from "bun";
import {
  MessageVariant,
  createUpdatePlayersMessage,
  defaultClientMessageSchema,
  movePlayerMessageSchema,
  userJoinMessageSchema,
  ROOM_NAME,
  TICK_DELAY,
  PLAYER_SPEED,
} from "shared";
import { reviver } from "../utils";
import { world } from "../state";
import { server } from "..";

/**
 * when the server starts
 */
export function start() {
  // start update loop
  setInterval(() => update(Date.now()), TICK_DELAY);
}

/*
 * runs on every server cycle
 */
export function update(startTime: number) {
  const delta = Date.now() - startTime;

  // update player positions
  server.publish(
    ROOM_NAME,
    JSON.stringify(createUpdatePlayersMessage(world.players))
  );
}

/**
 * when the server receives a message from a user
 */
export const message = (ws: ServerWebSocket<unknown>, msg: string | Buffer) => {
  const json = JSON.parse(reviver(msg));
  const message = defaultClientMessageSchema.parse(json);

  switch (message.type) {
    case MessageVariant.UserJoin:
      const userJoinMessage = userJoinMessageSchema.parse(message);
      world.players.push({
        name: userJoinMessage.user,
        x: 256,
        y: 256,
        sid: 0,
      });
      break;

    case MessageVariant.MovePlayer:
      const movePlayerMessage = movePlayerMessageSchema.parse(message);
      const toBeUpdatedPlayer = world.players.find(
        (user) => user.name === movePlayerMessage.user
      );

      if (!toBeUpdatedPlayer)
        throw new Error(
          `Player with name [${toBeUpdatedPlayer}] was not found.`
        );

      toBeUpdatedPlayer.x += Math.sign(movePlayerMessage.data.x) * PLAYER_SPEED;
      toBeUpdatedPlayer.y += Math.sign(movePlayerMessage.data.y) * PLAYER_SPEED;
      toBeUpdatedPlayer.sid = movePlayerMessage.data.sid;

      break;

    default:
      console.log("[ERR]", `unhandled message [${message.type}] received`);
      break;
  }
};
