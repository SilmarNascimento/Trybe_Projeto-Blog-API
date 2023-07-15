const { Category, BlogPost, PostCategory } = require('../models');

const array1 = [{}, undefined];
const array2 = [5, undefined];

console.log(array1.some((item) => !item));

const main = async () => {
  const allCategories = await PostCategory.findAll();
  console.log(allCategories);
};

main();