import type { ServerWebSocket } from "bun";
import {
  MessageVariant,
  defaultClientMessageSchema,
  userJoinMessageSchema,
} from "shared";
import { reviver } from "../utils";

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
      break;

    default:
      console.log("[ERR]", `unhandled message [${message.type}] received`);
      break;
  }
};
