import { DB } from "https://deno.land/x/sqlite/mod.ts";

export const db = new DB('./db/sooth.sqlite', { mode: "write" });

export const closeDb = () => db.close();

