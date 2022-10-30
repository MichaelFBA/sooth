import musicmetadata from "https://esm.sh/musicmetadata?deno-std=0.161.0";
import { createReadStream } from "https://deno.land/std@0.153.0/node/fs.ts";
import { recursiveReaddir } from "./read-directory.ts";
import { db } from "../db/db.ts";

export const readTags = (path: string) => {
  return new Promise((resolve, reject) => {
    const stream = createReadStream(path);
    musicmetadata(stream, function (err: Error, metadata: Record<string, any>) {
      if (err) {
        reject(err);
      }
      stream.destroy();
      resolve(metadata);
    });
  });
};

export async function readAudioAndUpsert(path: string, extension = ".mp3") {
  const files = await recursiveReaddir(path, extension);
  for (const path of files) {
    const { title, artist, album, year, genre, track, disk } = await readTags(
      path,
    );
    const fileName = path.split("/").at(-1);
    const filePath = path;
    const [artistName = ""] = artist;
    const [albumGenre = ""] = genre;
    const albumYear = year ? parseInt(year) : null;
    const trackNumber = track.no ?? null;
    const diskNumber = disk.no ?? null;
    await db.query(
      `
            INSERT INTO audio (file_name, file_path, title, artist, album, year, genre, track_number, disk_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(file_name) DO UPDATE 
            SET title = EXCLUDED.title, 
                artist = EXCLUDED.artist, 
                album = EXCLUDED.album,
                year = EXCLUDED.year,
                genre = EXCLUDED.genre,
                track_number = EXCLUDED.track_number,
                disk_number = EXCLUDED.disk_number;
        `,
      [
        fileName,
        filePath,
        title,
        artistName,
        album,
        albumYear,
        albumGenre,
        trackNumber,
        diskNumber,
      ],
    );
  }
}
