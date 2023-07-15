const Joi = require('joi');

const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const displayNameSchema = Joi.string().min(8).required();
const emailSchema = Joi.string().regex(emailRegex).required().messages({
  'string.pattern.base': '"email" must be a valid email',
});
const passwordSchema = Joi.string().min(6).required();
const imageSchema = Joi.string();
const nameSchema = Joi.string().required();
const titleSchema = Joi.string().required();
const contentSchema = Joi.string().required();
const categoryIdSchema = Joi.required();

const crateUserSchema = Joi.object({
  displayName: displayNameSchema,
  email: emailSchema,
  password: passwordSchema,
  image: imageSchema,
});

const createCategorySchema = Joi.object({
  name: nameSchema,
});

const createPostSchema = Joi.object({
  title: titleSchema,
  content: contentSchema,
  categoryIds: categoryIdSchema,
}).messages({
  'any.required': 'Some required fields are missing',
});

module.exports = {
  crateUserSchema,
  createCategorySchema,
  createPostSchema,
};
