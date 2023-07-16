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
    const allPosts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user' },
        { model: Category, as: 'categories', through: { attributes: [] },
      }],
    });
    const formattedPosts = allPosts.map(({ dataValues: post }) => {
      const { id, displayName, email, image } = post.user.dataValues;
      const formattedPost = { ...post, user: { id, displayName, email, image } };
      return formattedPost;
    });
    return { status: 'SUCCESSFUL', data: formattedPosts };
  } catch (error) {
    return { status: 'ERROR', data: { message: 'Internal Server Error' } };
  }
};

const getPostsById = async (postId) => {
  try {
    const allPosts = await BlogPost.findOne({
      where: { id: postId },
      include: [
        { model: User, as: 'user' },
        { model: Category, as: 'categories', through: { attributes: [] },
      }],
    });
    const formattedPosts = allPosts.map(({ dataValues: post }) => {
      const { id, displayName, email, image } = post.user.dataValues;
      const formattedPost = { ...post, user: { id, displayName, email, image } };
      return formattedPost;
    });
    return { status: 'SUCCESSFUL', data: formattedPosts };
  } catch (error) {
    return { status: 'ERROR', data: { message: 'Internal Server Error' } };
  }
};

module.exports = {
  createPost,
  findAllCategoryIds,
  getAllPosts,
  getPostsById,
};
