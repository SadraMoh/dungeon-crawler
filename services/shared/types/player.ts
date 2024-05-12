import { z } from "zod";
import { positionSchema } from "./position";

export const playerSchema = z
  .object({
    name: z.string(),
  })
  .and(positionSchema);

export type Player = z.infer<typeof playerSchema>;
