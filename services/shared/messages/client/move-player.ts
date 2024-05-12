import { z } from "zod";
import {
  MessageVariant,
  createClientMessage,
  createClientMessageSchema,
  positionSchema,
  Position,
} from "../../types";

export const movePlayerMessageSchema =
  createClientMessageSchema(positionSchema);

export type MovePlayerMessageSchema = z.infer<typeof movePlayerMessageSchema>;

export const createUserJoinMessage = (user: string, x: number, y: number) =>
  createClientMessage(user, MessageVariant.UserJoin, {
    x,
    y,
  } satisfies Position);
