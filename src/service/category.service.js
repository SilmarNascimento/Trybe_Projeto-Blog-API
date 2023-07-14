const { Category } = require('../models');

const createCategory = async (name) => {
  const alreadyExists = await Category.findOne({
    where: { name },
  });
  if (alreadyExists) {
    return { status: 'CONFLICT', data: { message: 'Category already registered' } };
  }
  try {
    const newCategory = await Category.create({ name });
    return { status: 'CREATED', data: newCategory };  
  } catch (error) {
    return { status: 'ERROR', data: { message: 'Internal Server Error' } };
  }
};

module.exports = {
  createCategory,
};