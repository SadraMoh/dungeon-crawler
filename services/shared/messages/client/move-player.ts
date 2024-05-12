import { z } from "zod";
import {
  MessageVariant,
  createClientMessage,
  createClientMessageSchema,
  vec2,
  Vec2,
} from "../../types";

export const movePlayerMessageSchema = createClientMessageSchema(vec2);

export type MovePlayerMessageSchema = z.infer<typeof movePlayerMessageSchema>;

export const createMovePlayerMessage = (user: string, dx: number, dy: number) =>
  createClientMessage(user, MessageVariant.MovePlayer, {
    x: dx,
    y: dy,
  } satisfies Vec2);
