const { postService } = require('../service');

const postValidation = async (request, response, next) => {
  const { id } = request.params;
  const { id: tokenUserId } = request.user;
  const { data: postFound } = await postService.getPostById(id);
  if (postFound && postFound.message === 'Post does not exist') {
    return response.status(404).json({ message: 'Post does not exist' });
  }
  if (postFound.userId !== tokenUserId) {
    return response.status(401).json({ message: 'Unauthorized user' });
  }
  request.post = postFound;
  next();
};

module.exports = postValidation;
