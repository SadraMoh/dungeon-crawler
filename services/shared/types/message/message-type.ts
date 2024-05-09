import { z } from "zod";

/** message type discriminator */
export enum MessageVariant {
  UserJoin = "user-join",
}

export const messageTypeSchema = z.nativeEnum(MessageVariant);
