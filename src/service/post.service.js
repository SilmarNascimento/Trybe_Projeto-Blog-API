const { Category } = require('../models');

const createPost = async () => {

};

const findAllCategoryIds = async (array) => {
  const promise = array.map(async (id) => {
    const categoryId = await Category.findOne({
      Where: { id },
    });
    return categoryId;
  });
  const response = await Promise.all(promise);
  if (response.some((id) => id === undefined)) {
    return { status: 400, data: { message: 'one or more "categoryIds" not found' } };
  }
};

module.exports = {
  createPost,
  findAllCategoryIds,
};
