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

export const createMovePlayerMessage = (user: string, x: number, y: number) =>
  createClientMessage(user, MessageVariant.MovePlayer, {
    x,
    y,
  } satisfies Position);
