const { BlogPost, PostCategory } = require('../models');

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
    return { status: 'ERROR' };
  }
};

const main = async () => {
  console.log(await deletePostById(1));
};

main();