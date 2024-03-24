import { jwt } from "../utils/jwt.js";

function asureAuth(req, res, next){
    // console.log('middleware ejecutado')
    if(!req.headers.authorization){
        return res.status(403).send({message: 'La petición no contiene la cabecera de autorización'})
    }

    const token = req.headers.authorization.replace("Bearer ", "")

    try {
        const hasExpired = jwt.hasExpiredToken(token)

        if(hasExpired){
            return res.status(400).send({message: 'El token ha expirado'})
        }

        const payload = jwt.decodeToken(token)
        req.user = payload
        next();
    } catch (error) {
        return res.status(400).send({message: 'El token es inválido'})
    }
}

export const  mdwAuth= {
    asureAuth
}