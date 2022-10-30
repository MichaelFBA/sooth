import { cron } from "https://deno.land/x/deno_cron/cron.ts";
import { readAudioAndUpsert } from "./audio.ts";

cron("*/30 * * * * *", async () => {
  await readAudioAndUpsert("static", ".mp3");
});
