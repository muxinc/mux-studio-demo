import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";

const { MUX_TOKEN_ID, MUX_TOKEN_SECRET } = process.env;

const createLivestream = async () => {
  const auth = Buffer.from(`${MUX_TOKEN_ID}:${MUX_TOKEN_SECRET}`).toString(
    "base64"
  );
  const response = await fetch(`https://api.mux.com/video/v1/live-streams`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      playback_policy: "public",
      new_asset_settings: { playback_policy: "public" },
    }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const { data } = await response.json();
  return data;
};

const createStudio = async () => {
  const livestream = await createLivestream();

  const auth = Buffer.from(`${MUX_TOKEN_ID}:${MUX_TOKEN_SECRET}`).toString(
    "base64"
  );

  const response = await fetch(`https://api.mux.com/video/v1/studios`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      live_stream_id: livestream.id,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const { data } = await response.json();
  return data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const studio = await createStudio();
    res.status(StatusCodes.OK).json(studio);
  } else {
    res.status(StatusCodes.METHOD_NOT_ALLOWED);
  }
}
