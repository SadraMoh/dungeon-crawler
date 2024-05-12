import { Accessor } from "solid-js";
import { convertPositionToStyle } from "./util";
import { Player } from "shared";

const PLAYER_SIZE = 32;

function PlayerSprite({ player }: { player: Accessor<Player> }) {
  const style = () => {
    return convertPositionToStyle(player().x, player().y, PLAYER_SIZE);
  };

  return <div class="player" style={{ ...style() }} />;
}

export default PlayerSprite;
