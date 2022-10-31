import { cron } from "https://deno.land/x/deno_cron/cron.ts";
import { readAudioAndUpsert } from "./audio.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
const { AUDIO_DIR } = config()

cron("*/10 * * * * *", async () => {
  await readAudioAndUpsert(AUDIO_DIR, ".mp3");
});
