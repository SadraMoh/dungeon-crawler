import { z } from "zod";
import {
  MessageVariant,
  createClientMessage,
  createClientMessageSchema,
} from "../../types";

export const userJoinMessageSchema = createClientMessageSchema(z.undefined());

export type UserJoinMessage = z.infer<typeof userJoinMessageSchema>;

export const createUserJoinMessage = (user: string) =>
  createClientMessage(user, MessageVariant.UserJoin);
