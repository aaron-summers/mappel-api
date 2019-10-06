const Joi = require("@hapi/joi");

//user validation
const validateSignup = data => {
  const schema = Joi.object({
    username: Joi.string()
      .min(2)
      .required(),
    email: Joi.string()
      .email()
      .min(6)
      .required(),
    password: Joi.string()
      .min(8)
      .required()
  });
  return schema.validate(data);
};

const validateLogin = data => {
  const schema = Joi.object({
    username: Joi.string()
      .min(2)
      .required(),
    password: Joi.string()
      .min(8)
      .required()
  });
  return schema.validate(data);
};

module.exports.validateSignup = validateSignup;
module.exports.validateLogin = validateLogin;
