import type { Request, Response, NextFunction } from "express"

export const Auth = {
    private: (req: Request, res: Response, next: NextFunction) => {
        let success = true

        if(success){
            next()
        }

        return res.status(403).json("Não autorizado")
    }
}
