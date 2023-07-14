const { emailSchema, categorySchema } = require('../middleware/schema');

const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const varia = 'silmarsilmar.com';
const cat = {
  n0me: 'alguma coisa',
};
console.log(regex.test(varia));

console.log(categorySchema.validate(cat).error.details);
console.log(emailSchema.validate(varia).error.message);