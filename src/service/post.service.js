const { Category, BlogPost, PostCategory } = require('../models');

const createPost = async ({ title, content, userId }, arrayId) => {
  try {
    const updated = new Date().toISOString();
    const published = new Date().toISOString();
    const postCreated = await BlogPost.create({ title, content, userId, updated, published });
    const promise = arrayId.map(async (id) => {
      console.log(typeof postCreated.id, typeof id);
      const postCategoryObj = { postId: postCreated.id, categoryId: id };
      console.log('objeto ao criar dados na tabela intermediaria', postCategoryObj);
      const postCategoryCreated = await PostCategory.create(postCategoryObj);
      return postCategoryCreated;
    });
    const insertresponse = await Promise.all(promise);
    console.log('tabela intermediaria: ', insertresponse);
    return { status: 'CREATED', data: postCreated };
  } catch (error) {
    return { status: 'ERROR', data: { message: 'Internal Server Error' } };
  }
};

const findAllCategoryIds = async (array) => {
  try {
    const promise = array.map(async (id) => {
      console.log(id);
      console.log(typeof id);
      const categoryId = await Category.findByPk(id);
      return categoryId;
    });
    const response = await Promise.all(promise);
    if (response.some((categoryObj) => !categoryObj)) {
      return { status: 'BAD_REQUEST', data: { message: 'one or more "categoryIds" not found' } };
    }
  } catch (error) {
    return { status: 'ERROR', data: { message: 'Internal Server Error' } };
  }
};

module.exports = {
  createPost,
  findAllCategoryIds,
};
