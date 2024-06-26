export default (err, req, res, next) => {
    err.statusCode = err?.statusCode || 500
    err.status = err?.status || "Internal Server Error"
    res.status(err.statusCode).send({
        status: err.status,
        message: err.message
    })
}