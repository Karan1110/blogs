const joi = require("joi");

module.exports = function validateUser(input) {
    const schema = {
        name: joi.string().max(25).min(5).required(),
        email : joi.string().email().max(100).min(5).required(),
        password: joi.string().max(200).min(5).required(),
        isAdmin : joi.boolean().required()
    };
    return joi.validate(input, schema);
};
