import { z } from "zod";
import { vec2 } from "./vec2";

export const playerSchema = z
  .object({
    name: z.string(),
  })
  .and(vec2);

export type Player = z.infer<typeof playerSchema>;
