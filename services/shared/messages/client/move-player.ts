import { z } from "zod";
import {
  MessageVariant,
  createClientMessage,
  createClientMessageSchema,
  vec2Schema,
  sequenceIdSchema,
  SequenceId,
} from "../../types";

export const movePlayerPayloadSchema = vec2Schema.extend({
  sid: sequenceIdSchema,
});
export type MovePlayerPayload = z.infer<typeof movePlayerPayloadSchema>;
export const movePlayerMessageSchema = createClientMessageSchema(
  movePlayerPayloadSchema
);
export type MovePlayerMessageSchema = z.infer<typeof movePlayerMessageSchema>;

export const createMovePlayerMessage = (
  user: string,
  dx: number,
  dy: number,
  sid: SequenceId
) =>
  createClientMessage(user, MessageVariant.MovePlayer, {
    x: dx,
    y: dy,
    sid,
  } satisfies MovePlayerPayload);
