const { User, Category, BlogPost, PostCategory } = require('../models');

const ERROR_RESPONSE = { status: 'ERROR', data: { message: 'Internal Server Error' } };

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
    return ERROR_RESPONSE;
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
    return ERROR_RESPONSE;
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
    return ERROR_RESPONSE;
  }
};

const getPostById = async (postId) => {
  try {
    const postFound = await BlogPost.findOne({
      where: { id: postId },
      include: [
        { model: User, as: 'user' },
        { model: Category, as: 'categories', through: { attributes: [] },
      }],
    });
    if (!postFound) {
    return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
    }
    const { id, displayName, email, image } = postFound.dataValues.user.dataValues;
    const formattedPost = { ...postFound.dataValues, user: { id, displayName, email, image } };
    return { status: 'SUCCESSFUL', data: formattedPost };
  } catch (error) {
    return ERROR_RESPONSE;
  }
};

const updatePostById = async (tokenUserId, postId, contentObj) => {
  try {
    const { data: postFound } = await getPostById(postId);
    if (postFound.userId !== tokenUserId) {
      return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
    }
    const updatedPost = {
      ...postFound,
      title: contentObj.title,
      content: contentObj.content,
    };
    await BlogPost.update(updatedPost, {
      where: { id: postId },
    });
    return { status: 'SUCCESSFUL', data: updatedPost };
  } catch (error) {
    return ERROR_RESPONSE;
  }
};

const deletePostById = async (postId) => {
  try {
    const postCategoryDele = await PostCategory.destroy({
      where: { postId },
    });
    console.log(postCategoryDele);
    const deleteResponse = await BlogPost.destroy({
      where: { id: postId },
    });
    console.log(deleteResponse);
    return { status: 204 };
  } catch (error) {
    console.log(error);
    return ERROR_RESPONSE;
  }
};

module.exports = {
  createPost,
  findAllCategoryIds,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
