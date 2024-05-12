import { Index, Show } from "solid-js";
import { listen, send, wsStatus } from "./ws";
import { currentPlayerId, player, setWorld, world } from "./state";
import PlayerSprite from "./player-sprite";
import { createUserJoinMessage, updatePlayersMessageSchema } from "shared";
import { handleInputs } from "./input";

function App() {
  const join = () => {
    send(createUserJoinMessage(currentPlayerId()));
    handleInputs();
  };

  listen(updatePlayersMessageSchema, ({ data }) => {
    setWorld("players", data);
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
