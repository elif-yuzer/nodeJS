import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import { BadRequest, Forbidden } from '../utils/error'

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string }    // bu kısımda yaptıgım olay Req objesi içinde normalde req.body,header,params,url falan var kullanıcıdan geln bılgılerı user metodu ile req objsei içinde gondermek ıın bu sekılde ekleme yapılıyorreq.user    → middleware'den gelen kullanıcı bilgisi
    }
  }
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    if(!authHeader) throw new BadRequest("Unauthorized")
    console.log(authHeader) // Bearer <token>
    
    const token = authHeader.split(' ')[1]
    if(!token) throw new BadRequest("Token not found")
    
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!,  // kesinlikle string, undefined değil  typescriptten dolayı !
        (err, decoded: any) => {
            /*   //jwt verify foonk bileti açar muhru dogrular decoded parametresi olarak verir yanı decoded içinde id ve role var */
            if(err) throw new Forbidden("Forbidden")
            req.user = { id: decoded._id, role: decoded.role }
            next()
        }
    )
}

export default verifyJWT