import type { ServerWebSocket } from "bun";
import {
  MessageVariant,
  createUpdatePlayersMessage,
  defaultClientMessageSchema,
  movePlayerMessageSchema,
  userJoinMessageSchema,
} from "shared";
import { reviver } from "../utils";
import { world } from "../state";
import { ROOM_NAME } from "../constants";
import { server } from "..";

export const TICK_RATE = 1000;

/**
 * when the server starts
 */
export function start() {}

/*
 * runs on every server cycle
 */
export function update() {}

/**
 * when the server receives a message from a user
 */
export const message = (ws: ServerWebSocket<unknown>, msg: string | Buffer) => {
  const json = JSON.parse(reviver(msg));
  const message = defaultClientMessageSchema.parse(json);

  switch (message.type) {
    case MessageVariant.UserJoin:
      const userJoinMessage = userJoinMessageSchema.parse(message);
      console.log("[EVENT]", MessageVariant.UserJoin, userJoinMessage.data);

      world.players.push({
        name: userJoinMessage.user,
        x: 256,
        y: 256,
      });

      server.publish(
        ROOM_NAME,
        JSON.stringify(createUpdatePlayersMessage(world.players))
      );

      break;

    case MessageVariant.MovePlayer:
      const movePlayerMessage = movePlayerMessageSchema.parse(message);
      console.log("[EVENT]", MessageVariant.MovePlayer, movePlayerMessage.data);

      const toBeUpdatedPlayer = world.players.find(
        (user) => user.name === movePlayerMessage.user
      );

      if (!toBeUpdatedPlayer)
        throw new Error(
          `Player with name [${toBeUpdatedPlayer}] was not found.`
        );

      toBeUpdatedPlayer.x = movePlayerMessage.data.x;
      toBeUpdatedPlayer.y = movePlayerMessage.data.y;

      server.publish(
        ROOM_NAME,
        JSON.stringify(createUpdatePlayersMessage(world.players))
      );

      break;

    default:
      console.log("[ERR]", `unhandled message [${message.type}] received`);
      break;
  }
};
