import { Index, Show } from "solid-js";
import { listen, send, wsStatus } from "./ws";
import { currentPlayerId, player, setWorld, world } from "./state";
import PlayerSprite from "./player-sprite";
import {
  PLAYER_SPEED,
  TICK_DELAY,
  createUserJoinMessage,
  updatePlayersMessageSchema,
} from "shared";
import { handleInputs, inputs, sequenceNumber } from "./input";
import { produce } from "solid-js/store";
import gsap from "gsap";

function App() {
  const join = () => {
    send(createUserJoinMessage(currentPlayerId()));
    handleInputs();
  };

  listen(updatePlayersMessageSchema, ({ data }) => {
    setWorld(
      "players",
      produce((draftPlayers) => {
        data.forEach((player) => {
          const index = draftPlayers.findIndex((i) => i.name === player.name);

          if (index === -1) {
            draftPlayers.push(player);
            return;
          }

          const draftPlayer = draftPlayers[index];

          // handle movement
          if (player.name === currentPlayerId()) {
            // reconsiliation
            draftPlayer.x = player.x;
            draftPlayer.y = player.y;
            draftPlayer.sid = player.sid;

            const lastProcessedSidIndex = inputs.findIndex(
              (input) => input.sid === player.sid
            );

            if (lastProcessedSidIndex >= -1) {
              inputs.splice(0, lastProcessedSidIndex + 1);
            }

            inputs.forEach(({ x: dx, y: dy }) => {
              draftPlayer.x += Math.sign(dx) * PLAYER_SPEED;
              draftPlayer.y += Math.sign(dy) * PLAYER_SPEED;
            });
          } else {
            // interolation
            gsap.to(draftPlayer, {
              x: player.x,
              y: player.y,
              duration: TICK_DELAY / 1000,
              ease: "none",
            });
          }
        });
      })
    );
  });

  return (
    <main class="container">
      <p>Connection: {wsStatus()}</p>

      <Show when={player()} fallback={<button onClick={join}>Join</button>}>
        <section class="playground">
          <Index each={world.players}>
            {(pl) => {
              return <PlayerSprite player={pl} />;
            }}
          </Index>
        </section>
      </Show>
    </main>
  );
}

export default App;
