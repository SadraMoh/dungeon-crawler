import { createWS, createWSState } from "@solid-primitives/websocket";
import {
  DefaultClientMessage,
  TICK_DELAY,
  defaultServerMessageSchema,
} from "shared";
import { z } from "zod";

export const ws = createWS(import.meta.env.VITE_WS_HOST);

export const send = (msg: DefaultClientMessage) => ws.send(JSON.stringify(msg));

export const listen = <S extends z.Schema>(
  schema: S,
  callback: (data: z.infer<S>) => void
) =>
  ws.addEventListener("message", ({ data }) => {
    const msg = defaultServerMessageSchema.parse(JSON.parse(data));
    const maybeParsed = schema.safeParse(msg);

    if (maybeParsed.success) {
      callback(maybeParsed.data);
    }
  });

const status = createWSState(ws);
export const wsStatus = () =>
  ["Connecting", "Connected", "Disconnecting", "Disconnected"][status()];

setInterval(() => dispatchEvent(new Event("update")), TICK_DELAY);
