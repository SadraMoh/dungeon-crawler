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
import { handleInputs, inputs, keys } from "./input";
import { produce } from "solid-js/store";
import gsap from "gsap";
import { Joystick, PointerPlugin, GamepadPlugin } from "solid-joystick";

function App() {
  const join = () => {
    send(createUserJoinMessage(currentPlayerId()));
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

  let isFirst = true;
  listen(updatePlayersMessageSchema, () => {
    if (player() === undefined || isFirst === false) return;
    isFirst = true;

    // inputs
    handleInputs();
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

        <div
          style={{
            width: "200px",
            height: "200px",
            margin: "auto",
            "margin-top": "24px",
          }}
        >
          <Joystick
            onMove={({ offset }: any) => {
              const { x, y } = offset.percentage;

              if (Math.abs(x) > 0.2) {
                if (Math.sign(x) > 0) keys.d = true;
                else keys.a = true;
              } else keys.a = keys.d = false;

              if (Math.abs(y) > 0.2) {
                if (Math.sign(y) > 0) keys.s = true;
                else keys.w = true;
              } else keys.w = keys.s = false;
            }}
            plugins={[PointerPlugin(), GamepadPlugin()]}
            handleProps={{
              style: {
                background: "red",
                width: "35%",
                height: "35%",
                "border-radius": "50%",
              },
            }}
            baseProps={{
              style: { background: "black", "border-radius": "50%" },
            }}
          />
        </div>
      </Show>
    </main>
  );
}

export default App;
