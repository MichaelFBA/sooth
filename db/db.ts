import { DB } from "https://deno.land/x/sqlite/mod.ts";

export const db = new DB(new URL('../sooth.db', import.meta.url));

export const closeDb = () => db.close();

