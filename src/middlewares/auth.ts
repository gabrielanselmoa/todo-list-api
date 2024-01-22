import {Request, Response, NextFunction} from "express"
import JWT from "jsonwebtoken"

export const Auth = {
    private: (req: Request, res: Response, next: NextFunction) => {
        
        let success = false

        if(req.headers.authorization){
            
            //Bearer
            const [authType, token] = req.headers.authorization.split(" ");

            if(authType === "Bearer"){

                try {
                    JWT.verify(
                        token,
                        process.env.JWT_SECRET_KEY as string
                    )
                        success = true
                    // console.log("DECODED", decoded);
                } catch (error) {
                    
                }
            }
        }

        if(success){
            next()
        }else{
            res.status(403)
            res.json({error: "Unauthorized"})
        }
    }
}