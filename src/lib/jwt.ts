import { SignJWT, jwtVerify } from "jose";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET não foi definida");
}

const secret = new TextEncoder().encode(jwtSecret);

export async function createAccessToken(userId: number) {
  return new SignJWT()
    .setProtectedHeader({
      alg: "HS256",
    })
    .setSubject(String(userId))
    .setIssuedAt()
    .sign(secret);
}

export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, secret, {
    algorithms: ["HS256"],
  });

  return payload;
}