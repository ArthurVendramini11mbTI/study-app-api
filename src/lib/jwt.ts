import { SignJWT, jwtVerify } from "jose";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined");
}

const secret = new TextEncoder().encode(jwtSecret);
const issuer = 'axis-api'
const audience = 'axis-app'

export async function createAccessToken(userId: number) {
  return new SignJWT()
    .setProtectedHeader({
      alg: "HS256",
    })
    .setSubject(String(userId))
    .setIssuer(issuer)
    .setAudience(audience)
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);
}

export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, secret, {
    algorithms: ["HS256"],
    issuer,
    audience,
  });

  return payload;
}
