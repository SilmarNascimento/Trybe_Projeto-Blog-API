const { BlogPost, User, Category } = require('../models');

const main = async () => {
  try {
    console.log('entrei service');
    const allPosts = await BlogPost.findAll({
      include: [{
        model: User, as: 'user', through: { attributes: [] },
      }, {
        model: Category, as: 'categories', through: { attributes: [] },
      }],
    });
    const returnObj = { status: 'SUCCESSFUL', data: allPosts };
    console.log(returnObj);
    return returnObj;
  } catch (error) {
    return { status: 'ERROR', data: { message: 'Internal Server Error' } };
  }
};

main();