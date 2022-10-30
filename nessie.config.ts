import {
    ClientSQLite,
    NessieConfig,
} from "https://deno.land/x/nessie@2.0.10/mod.ts";

/** This is the final config object */
const config: NessieConfig = {
    client: new ClientSQLite("./db/sooth.sqlite"),
    migrationFolders: ["./db/migrations"],
    seedFolders: ["./db/seeds"],
    
};

export default config;
