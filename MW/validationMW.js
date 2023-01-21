const { validationResult } = require("express-validator");
module.exports = (req, res, next) => {
    let result = validationResult(req);
    if (!result.isEmpty()) {
        let message = result.errors.reduce((current, error) => current + error.msg + "  ", "")
        let error = new Error(message);
        error.status = 422;
        throw error;
    }
    else
        next();
}