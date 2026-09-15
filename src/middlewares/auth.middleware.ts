import type { Request, Response, NextFunction } from "express"
import { verifyAccessToken } from "../lib/jwt";

export const Auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({message: "Token não enviado",});
        }

        const [type, token] = authorization.split(" ");

        if (type !== "Bearer" || !token) {
            return res.status(401).json({message: "Token inválido",});
        }

        try {
            const payload = await verifyAccessToken(token);

            console.log(payload);
            next();
            
        } catch {
            return res.status(401).json({message: "Token inválido ou expirado",});
        }
    }
}
