import { message, start } from "./game";

const SV_PORT = process.env.SV_PORT ?? 3000;

Bun.serve({
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
    },
    close: (ws) => console.log("[CLOSE]"),
    drain: (ws) => console.log("[DRAIN]"),
  },
  port: SV_PORT,
});

console.log(`🚀 Running on ${SV_PORT}`);

start();
