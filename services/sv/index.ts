import { ROOM_NAME } from "./constants";
import { message, start } from "./game";

const SV_PORT = process.env.SV_PORT ?? 3000;

export const server = Bun.serve({
  fetch(req, server) {
    // upgrade the request to a WebSocket
    if (server.upgrade(req)) {
      return; // do not return a Response
    }

    return new Response("Upgrade failed :(", { status: 500 });
  },
  websocket: {
    message: message,
    open: (ws) => {
      console.log("[OPEN]");
      ws.subscribe(ROOM_NAME);
    },
    close: (ws) => console.log("[CLOSE]"),
    drain: (ws) => console.log("[DRAIN]"),
  },
  port: SV_PORT,
});

console.log(`🚀 Running on ${SV_PORT}`);

start();
