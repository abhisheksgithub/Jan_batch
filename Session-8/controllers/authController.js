import UserModel from "../models/userModel.js";
import ApplicationException from "../utils/ApplicationsException.js";
import ErrorWrapper from "../utils/ErrorWrapper.js";
import { createToken, tokenVerification } from "../utils/common.js";


const signUp = ErrorWrapper(async (req, res, next) => {
    const { roles, ...finalBody} = req.body
    const saveSuccess = await UserModel.create(finalBody)

    const jwtUserToken = createToken(saveSuccess)

    res.status(201).send({
        status: 'success',
        token: jwtUserToken,
        data: saveSuccess
    })
})


const signIn = ErrorWrapper(async (req, res, next) => {
    const { userId, password } = req.body

    if(!userId || !password) {
        return next(new ApplicationException("UserID and Password is mandatory", 400))
    }
    const actualUser = await UserModel.findOne({ email: userId })

    if(!actualUser || !(await actualUser.validatePassword(password, actualUser.password))) {
        return next(new ApplicationException("Invalid credentials", 401))
    }

    const jwtUserToken = createToken(actualUser)

    res.status(201).send({
        status: 'success',
        token: jwtUserToken,
        data: actualUser
    })
})

const protectedController = ErrorWrapper(async (req, res, next) => {
    // Protection logic / AuthN logic for the routes
    const { authorization } = req.headers
    const token = authorization?.split(' ')[1]
    if(!token) {
        return next(new ApplicationException('Unauthorized to access resource', 401))
    }

    const decodedValue = tokenVerification(token)
    if (!decodedValue) {
        return next(new ApplicationException('Unauthorized to access resource', 401))
    }
    const currentUser = await UserModel.findById(decodedValue._id) 
    req.currentUser = currentUser
    next()
})

const authorizationRestriction = (...preDefinedRoles) => ErrorWrapper(async (req, res, next) => {
    if(!preDefinedRoles.includes(req.currentUser.roles)) {
        return next(new ApplicationException("Unauthorized to access resource - Authorization exception", 403))
    }
    next()
})

export { signUp, signIn, protectedController, authorizationRestriction }

// signup
// signIn
// fetch --> resources (data) --> Protected (AuthN)
// finTech/banking --> 
// buddling / minification
// Authorization

