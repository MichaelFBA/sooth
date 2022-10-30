import { HandlerContext } from "$fresh/server.ts";

export const handler = async (
  request: Request,
  _ctx: HandlerContext,
): Response => {
  const range = request.headers.get("range");

  const fileName = "../../static/demo.mp3";
  const videoSize = (await Deno.stat(new URL(fileName, import.meta.url))).size;
  if (!range) {
    const body = await Deno.readFile(new URL(fileName, import.meta.url));
    return new Response(body, {
      status: 206,
      headers: {
        "content-length": `${videoSize}`,
        "content-type": "audio/mpeg",
      },
    });
  } else {
    let [start, end] = range.replace(/bytes=/, "").split("-");
    start = parseInt(start, 10);
    end = end ? parseInt(end, 10) : videoSize - 1;
    const maxChunk = 1024 * 1024;
    if ((end - start + 1) > maxChunk) {
      end = start + maxChunk - 1;
    }

    let seek;
    if (start === 0) {
      seek = Deno.SeekMode.Start;
    } else if (end === videoSize - 1) {
      seek = Deno.SeekMode.End;
    } else {
      seek = Deno.SeekMode.Current;
    }

    const file = await Deno.open(new URL(fileName, import.meta.url), {
      read: true,
    });
    await Deno.seek(file.rid, start, seek);
    const content = new Uint8Array(end - start + 1);
    await file.read(content);
    file.close();

    return new Response(content, {
      status: 206,
      headers: {
        "content-range": `bytes ${start}-${end}/${videoSize}`,
        "accept-ranges": "bytes",
        "content-length": `${(end - start) + 1}`,
        "content-type": "audio/mpeg",
      },
    });
  }
};
