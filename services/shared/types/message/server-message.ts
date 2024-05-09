import { ZodType, z } from "zod";
import { MessageVariant, messageTypeSchema } from "./message-type";

export const createServerMessageSchema = <TData extends ZodType>(data: TData) =>
  z.object({
    type: messageTypeSchema,
    data,
  });

export const defaultServerMessageSchema = createServerMessageSchema(
  z.unknown()
);

export type DefaultServerMessage = z.infer<typeof defaultServerMessageSchema>;

export const createServerMessage = <TData>(
  type: MessageVariant,
  data?: TData
) =>
  ({
    type,
    data,
  } satisfies DefaultServerMessage);
