const joi = require("joi");

module.exports = function validateUser(input) {
    const schema = {
        title: joi.string().max(25).min(5).required(),
        author_id : joi.string().email().max(100).min(5).required()
    };
    return joi.validate(input, schema);
};
