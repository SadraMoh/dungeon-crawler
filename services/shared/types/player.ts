import { z } from "zod";
import { vec2Schema } from "./vec2";
import { sequenceIdSchema } from "./sequence-id";

export const playerSchema = z
  .object({
    name: z.string(),
    sid: sequenceIdSchema,
  })
  .and(vec2Schema);

export type Player = z.infer<typeof playerSchema>;
