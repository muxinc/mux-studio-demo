import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const { MUX_SIGNING_KEY, MUX_PRIVATE_KEY } = process.env;

type ResponseData = {
  studioJWT: string;
};

function signJWT(
  studioId: string,
  participantId: string,
  role: string
): ResponseData {
  const JWT = jwt.sign(
    {
      kid: MUX_SIGNING_KEY ?? "",
      aud: "studio",
      sub: studioId,
      pid: participantId,
      role: role,
    },
    Buffer.from(MUX_PRIVATE_KEY ?? "", "base64"),
    { algorithm: "RS256", expiresIn: "1h" }
  );
  return { studioJWT: JWT };
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const {
    query: { id, participantId, role },
    method,
  } = req;
  if (method === "GET") {
    res
      .status(StatusCodes.OK)
      .json(signJWT(id as string, participantId as string, role as string));
  } else {
    res.status(StatusCodes.METHOD_NOT_ALLOWED);
  }
}
