import {
  AbstractMigration,
  ClientSQLite,
  Info,
} from "https://deno.land/x/nessie@2.0.10/mod.ts";

export default class extends AbstractMigration<ClientSQLite> {
  /** Runs on migrate */
  async up(info: Info): Promise<void> {
    this.client.execute(`
        CREATE TABLE audio (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          file_name TEXT,
          file_path TEXT
        )
      `);
  }

  /** Runs on rollback */
    async down(info: Info): Promise<void> {
        this.client.execute(`
        DROP TABLE audio
      `);
  }
}
