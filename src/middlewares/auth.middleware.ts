import type { Request, Response, NextFunction } from "express"
import { verifyAccessToken } from "../lib/jwt";

export const Auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({message: "Token was not provided",});
        }

        const [type, token] = authorization.split(" ");

        if (type !== "Bearer" || !token) {
            return res.status(401).json({message: "Invalid token",});
        }

        try {
            const payload = await verifyAccessToken(token);

            if (!payload.sub) {
                return res.status(401).json({
                message: "Invalid token",
                });
            }

            req.userId = Number(payload.sub);

            next();
        } catch {
            return res.status(401).json({message: "Invalid or expired token",});
        }
    }
}
