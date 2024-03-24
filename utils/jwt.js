import jsonwebtoken, { decode } from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '../constants.js' 


const createAccessToken = (user) => {
    // Expiration date
    const expToken = new Date();
    expToken.setHours(expToken.getHours() + 24)

    const payload = {
        tokenType: 'access',
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime()
    }

    return jsonwebtoken.sign(payload, JWT_SECRET_KEY)
}

const createRefreshToken = (user) => {
    // Expiration date
    const expToken = new Date();
    expToken.setMonth(expToken.getMonth() + 1)

    const payload = {
        tokenType: 'refresh',
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime()
    }

    return jsonwebtoken.sign(payload, JWT_SECRET_KEY)
}

const decodeToken = (token) => {
    return jsonwebtoken.decode(token, JWT_SECRET_KEY, true)
} 

const hasExpiredToken = (token) => {
    const { exp } = decodeToken(token)

    const currentDate = Date.now();

    if(exp <= currentDate){
        return true
    } else {
        return false
    }
} 

export const jwt = {
    createAccessToken,
    createRefreshToken,
    decodeToken,
    hasExpiredToken
}