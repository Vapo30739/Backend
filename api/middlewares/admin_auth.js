const jwt = require("jsonwebtoken");
const parseHelper = require("../helpers/response_helper");
const is_admin = (req, res, next) => {
    try {
        const token = req.headers.auth;
        if (!token)
            throw new Error("Token not found");

        const user = jwt.decode(token);

        if (user.role < 1)
            throw new Error("you are not allowed to do this action");

        return next();

    } catch (err) {
        if (err.message.includes("you are not allowed to do this action"))
            return parseHelper(res, 401, null, err.message);
        if (err.message.includes("Token not found"))
            return parseHelper(res, 403, null, err.message);
        return parseHelper(res, 400, null, err.message);
    }
}

module.exports = {
    is_admin
};