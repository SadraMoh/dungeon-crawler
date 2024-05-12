import { World } from "shared";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

/**
 * all the world data
 * should mirror the one on the server
 */
export const [world, setWorld] = createStore<World>({
  players: [],
});

/**
 * current players id/name
 * is undefined when the user has not joined yet
 */
export const [currentPlayerId, setCurrentPlayerId] = createSignal<string>(
  "usr:" + Math.random().toFixed(8)
);

/**
 * current player
 * undefined if the player has not joined yet
 * */
export const player = () =>
  world.players.find((p) => p.name === currentPlayerId());
