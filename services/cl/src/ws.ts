import { createWS, createWSState } from "@solid-primitives/websocket";

export const ws = createWS(import.meta.env.VITE_WS_HOST);

const status = createWSState(ws);
export const wsStatus = () =>
  ["Connecting", "Connected", "Disconnecting", "Disconnected"][status()];
