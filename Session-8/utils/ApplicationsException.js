class ApplicationException extends Error {
    constructor(message, statusCode) {
        super(message)
        this.status = "Application Error"
        this.statusCode = statusCode
    }
}

export default ApplicationException