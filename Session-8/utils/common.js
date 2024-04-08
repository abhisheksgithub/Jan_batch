import jwt from "jsonwebtoken";

const JWT_TOP_SECRET = "JWT_TOP_SECRET"

function createToken(actualUser) {
    return jwt.sign({
        _id: actualUser._id,
        firstName: actualUser.firstName,
        email: actualUser.email
    }, JWT_TOP_SECRET, {
        expiresIn: '2d'
    });
}

function tokenVerification(token) {
    return jwt.verify(token, JWT_TOP_SECRET)
}

export { createToken, tokenVerification }