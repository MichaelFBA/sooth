import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sooth - Video</title>
      </Head>
      <audio src="/api/audio" controls></audio>
    </>
  );
}
