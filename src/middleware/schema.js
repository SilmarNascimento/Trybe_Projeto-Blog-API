const Joi = require('joi');

const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const displayNameSchema = Joi.string().min(8).required();
const emailSchema = Joi.string().regex(emailRegex).required().messages({
  'string.pattern.base': '"email" must be a valid email',
});
const passwordSchema = Joi.string().min(6).required();
const imageSchema = Joi.string();
const nameSchema = Joi.string().required();

const crateUserSchema = Joi.object({
  displayName: displayNameSchema,
  email: emailSchema,
  password: passwordSchema,
  image: imageSchema,
});

const categorySchema = Joi.object({
  name: nameSchema,
});

module.exports = {
  crateUserSchema,
  emailSchema,
  categorySchema,
};