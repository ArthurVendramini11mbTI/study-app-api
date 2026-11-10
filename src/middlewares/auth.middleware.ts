import type { Request, Response, NextFunction } from "express"
import { verifyAccessToken } from "../lib/jwt";
import { clearAuthCookie, getAuthCookie } from '../lib/authCookie'

export const Auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {
        const token = getAuthCookie(req.headers.cookie)

        if (!token) {
            return res.status(401).json({message: "Authentication cookie was not provided",});
        }

        try {
            const payload = await verifyAccessToken(token);

            if (!payload.sub) {
                clearAuthCookie(res)
                return res.status(401).json({
                message: "Invalid token",
                });
            }

            const userId = Number(payload.sub)

            if (!Number.isInteger(userId) || userId < 1) {
                clearAuthCookie(res)
                return res.status(401).json({message: "Invalid token",});
            }

            req.userId = userId;

            next();
        } catch {
            clearAuthCookie(res)
            return res.status(401).json({message: "Invalid or expired token",});
        }
    }
}
