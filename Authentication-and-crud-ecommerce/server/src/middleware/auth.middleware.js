
import userModel from "../models/user.model.js";
import { verifyAccessToken } from "../utils/auth.utils.js"

export const authenticate = async (req, res, next) => {

    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            message: "access token not found"
        })
    }

    const accessToken = authHeader.split(" ")[1]

    if (!accessToken) {
        return res.status(401).json({
            message: "access token not found"
        })
    }

    try {
        const decode = verifyAccessToken(accessToken)

        req.user = decode

        next()

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }
}