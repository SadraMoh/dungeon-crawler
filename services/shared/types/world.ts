import { z } from "zod";
import { playerSchema } from "./player";

export const worldSchema = z.object({
  players: z.array(playerSchema),
});

export type World = z.infer<typeof worldSchema>;
