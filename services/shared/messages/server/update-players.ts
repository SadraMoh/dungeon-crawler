import { z } from "zod";
import {
  MessageVariant,
  createServerMessage,
  createServerMessageSchema,
  playerSchema,
  type Player,
} from "../../types";

export const updatePlayersMessageSchema = createServerMessageSchema(
  z.array(playerSchema)
);

export type UpdatePlayersMessage = z.infer<typeof updatePlayersMessageSchema>;

export const createUpdatePlayersMessage = (players: Player[]) =>
  createServerMessage(MessageVariant.UpdatePlayers, players);
