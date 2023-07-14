const { emailSchema } = require('../middleware/schema');

const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const varia = 'silmarsilmar.com';
console.log(regex.test(varia));

console.log(emailSchema.validate(varia).error.details);
console.log(emailSchema.validate(varia).error.message);