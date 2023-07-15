const { createPostSchema } = require('../middleware/schema');

// const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
// const varia = 'silmarsilmar.com';
const cat = {
  content: 'content',
  categoryIds: 'ids',
};

console.log(createPostSchema.validate(cat).error.details);
console.log(createPostSchema.validate(cat).error.message);