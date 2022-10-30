import { asset, Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sooth</title>
        <link rel="stylesheet" href={asset("/global.css")} />
      </Head>
      {
        /* <div class="p-4 mx-auto max-w-screen-md">
        <Counter start={3} />
      </div> */
      }
      <div class="wrapper">
        <header class="main-head">🧙 Sooth</header>
        <aside class="side">
          <ul>
            <li>Music</li>
            <li>Movies</li>
          </ul>
        </aside>
        <article class="content">
          <h1>Main article area</h1>
          <p>
            In this layout, we display the areas in source order for any screen
            less that 500 pixels wide. We go to a two column layout, and then to
            a three column layout by redefining the grid, and the placement of
            items on the grid.
          </p>
        </article>
        <footer class="main-footer">The footer</footer>
      </div>
    </>
  );
}
