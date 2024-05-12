import { z } from "zod";

/** message type discriminator */
export enum MessageVariant {
  // client sent
  UserJoin = "user-join",
  MovePlayer = "move-player",

  // server sent
  UpdatePlayers = "update-players",
}

export const messageTypeSchema = z.nativeEnum(MessageVariant);
