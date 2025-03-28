import { z } from "zod";

export const vec2Schema = z.object({
  x: z.number(),
  y: z.number(),
});

export type Vec2 = z.infer<typeof vec2Schema>;
