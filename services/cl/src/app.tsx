import { Index, Show } from "solid-js";
import { listen, send, wsStatus } from "./ws";
import { currentPlayerId, player, setWorld, world } from "./state";
import PlayerSprite from "./player-sprite";
import {
  PLAYER_SPEED,
  createUserJoinMessage,
  updatePlayersMessageSchema,
} from "shared";
import { handleInputs, inputs } from "./input";
import { produce } from "solid-js/store";

function App() {
  const join = () => {
    send(createUserJoinMessage(currentPlayerId()));
    handleInputs();
  };

  listen(updatePlayersMessageSchema, ({ data }) => {
    setWorld(
      "players",
      produce((players) => {
        data.forEach((player) => {
          const index = players.findIndex((i) => i.name === player.name);

          if (index === -1) {
            players.push(player);
            return;
          }

          // handle movement
          players[index].x = player.x;
          players[index].y = player.y;
          players[index].sid = player.sid;

          // reconsiliation
          if (player.name === currentPlayerId()) {
            const lastProcessedSidIndex = inputs.findIndex(
              (input) => input.sid === player.sid
            );

            if (lastProcessedSidIndex >= -1) {
              inputs.splice(0, lastProcessedSidIndex + 1);
            }

            inputs.forEach(({ x: dx, y: dy }) => {
              players[index].x += Math.sign(dx) * PLAYER_SPEED;
              players[index].y += Math.sign(dy) * PLAYER_SPEED;
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
