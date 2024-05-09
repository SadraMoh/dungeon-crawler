import { wsStatus } from "./ws";

function App() {
  // window.addEventListener('keydown', handleKey);
  // window.addEventListener('keyup', handleKey);

  return (
    <main class="container">
      <p>Connection: {wsStatus()}</p>

      <section class="playground">
        <div class="player" style={{ top: "240px", left: "240px" }} />
      </section>

      <div class="controls"></div>
    </main>
  );
}

export default App;
