import { z } from "zod";

export const sequenceIdSchema = z.number({ description: "Sequence id" });

export type SequenceId = z.infer<typeof sequenceIdSchema>;
