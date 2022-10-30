import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sooth - Video</title>
      </Head>
      <video src="/api/video" controls></video>
    </>
  );
}
