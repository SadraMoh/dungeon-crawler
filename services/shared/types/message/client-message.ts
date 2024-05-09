import { ZodType, z } from "zod";
import { MessageVariant, messageTypeSchema } from "./message-type";

export const createClientMessageSchema = <TData extends ZodType>(data: TData) =>
  z.object({
    user: z.string(),
    type: messageTypeSchema,
    data,
  });

export const defaultClientMessageSchema = createClientMessageSchema(
  z.unknown()
);

export type DefaultClientMessage = z.infer<typeof defaultClientMessageSchema>;

export const createClientMessage = <TData>(
  user: string,
  type: MessageVariant,
  data?: TData
) =>
  ({
    user,
    type,
    data,
  } satisfies DefaultClientMessage);
