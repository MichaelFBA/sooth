import { HandlerContext } from "$fresh/server.ts";
import { db } from '../../db/db.ts'

export const handler = async (
  request: Request,
  _ctx: HandlerContext,
): Response => {
  const body = await db.queryEntries(`
    SELECT * FROM audio
  `)
  console.log(body)
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
};
