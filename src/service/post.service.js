const { User, Category, BlogPost, PostCategory } = require('../models');

const createPost = async ({ title, content, userId }, arrayId) => {
  try {
    const updated = new Date().toISOString();
    const published = new Date().toISOString();
    const postCreated = await BlogPost.create({ title, content, userId, updated, published });
    const promise = arrayId.map(async (id) => {
      const postCategoryObj = { postId: postCreated.id, categoryId: id };
      const postCategoryCreated = await PostCategory.create(postCategoryObj);
      return postCategoryCreated;
    });
    await Promise.all(promise);
    return { status: 'CREATED', data: postCreated };
  } catch (error) {
    return { status: 'ERROR', data: { message: 'Internal Server Error' } };
  }
};

const findAllCategoryIds = async (array) => {
  try {
    const promise = array.map(async (id) => {
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

const getAllPosts = async () => {
  try {
    console.log('entrei service');
    const allPosts = await BlogPost.findAll({
      include: [{
        model: User, as: 'user', through: { attributes: [] },
      }, {
        model: Category, as: 'categories', through: { attributes: [] },
      }],
    });
    console.log(allPosts);
    return { status: 'SUCCESSFUL', data: allPosts };
  } catch (error) {
    return { status: 'ERROR', data: { message: 'Internal Server Error' } };
  }
};

module.exports = {
  createPost,
  findAllCategoryIds,
  getAllPosts,
};
