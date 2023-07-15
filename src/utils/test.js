const { createPostSchema } = require('../middleware/schema');

const array1 = [{}, undefined];
const array2 = [5, undefined];

console.log(array1.some((item) => !item));