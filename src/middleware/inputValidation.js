const { crateUserSchema, createCategorySchema, createPostSchema } = require('./schema');

const loginInputValidation = (request, response, next) => {
  const { email, password } = request.body;
  if (!email && !password) {
    return response.status(400).json({
      message: 'Some required fields are missing',
    });
  }
  next();
};

const createCategoryInputValidation = (request, response, next) => {
  const { name } = request.body;
  const { error } = createCategorySchema.validate({ name });
  if (error && error.details[0].type === 'any.required') {
    return response.status(400).json({
      message: error.message,
    });
  }
  next();
};

const createUserInputValidation = (request, response, next) => {
  const { displayName, email, password, image } = request.body;
  const { error } = crateUserSchema.validate({ displayName, email, password, image });
  if (error && error.details[0].type === 'string.min') {
    return response.status(400).json({
      message: error.message,
    });
  }
  if (error && error.details[0].type === 'string.pattern.base') {
    return response.status(400).json({
      message: error.message,
    });
  }
  next();
};

const createPostInputValidation = (request, response, next) => {
  const { title, content, categoryIds } = request.body;
  const { error } = createPostSchema.validate({ title, content, categoryIds });
  if (error && error.details[0].type === 'any.required') {
    return response.status(400).json({
      message: error.message,
    });
  }
  if (error && error.details[0].type === 'string.pattern.base') {
    return response.status(400).json({
      message: error.message,
    });
  }
  next();
};

module.exports = {
  loginInputValidation,
  createUserInputValidation,
  createCategoryInputValidation,
  createPostInputValidation,
};