import database from "../src/models";

class CommentService {
  static async getAllComments() {
    try {
      return await database.Comments.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addComment(newComment) {
    try {
      return await database.Comments.create(newComment);
    } catch (error) {
      throw error;
    }
  }

  static async updateComment(id, updateComment) {
    try {
      const CommentToUpdate = await database.Comments.findOne({
        where: { id: Number(id) }
      });

      if (CommentToUpdate) {
        await database.Comments.update(updateComment, {
          where: { id: Number(id) }
        });

        return updateComment;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAComment(id) {
    try {
      const theComment = await database.Comments.findOne({
        where: { id: Number(id) }
      });

      return theComment;
    } catch (error) {
      throw error;
    }
  }

  static async deleteComment(id) {
    try {
      const CommentToDelete = await database.Comments.findOne({
        where: { id: Number(id) }
      });

      if (CommentToDelete) {
        const deletedComment = await database.Comments.destroy({
          where: { id: Number(id) }
        });
        return deletedComment;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getMessageComments(MessageId) {
    try {
      const messageComments = await database.Comments.findAll({
        where: { MessageId: Number(MessageId) }
      });

      return messageComments;
    } catch (error) {
      throw error;
    }
  }
}

export default CommentService;
