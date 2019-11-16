import CommentService from "../services/CommentService";
import Util from "../utils/Utils";

const util = new Util();

class CommentController {
  static async getAllComments(req, res) {
    try {
      const allComments = await CommentService.getAllComments();
      if (allComments.length > 0) {
        util.setSuccess(200, "Comments retrieved", allComments);
      } else {
        util.setSuccess(200, "No Comments found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addComment(req, res) {
    if (!req.body.content) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }
    const newComment = req.body;
    try {
      const createdComment = await CommentService.addComment(newComment);
      util.setSuccess(201, "Comment Added!", createdComment);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.Comment);
      return util.send(res);
    }
  }

  static async updatedComment(req, res) {
    const alteredComment = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }
    try {
      const updateComment = await CommentService.updateComment(
        id,
        alteredComment
      );
      if (!updateComment) {
        util.setError(404, `Cannot find Comment with the id: ${id}`);
      } else {
        util.setSuccess(200, "Comment updated", updateComment);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getAComment(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }

    try {
      const theComment = await CommentService.getAComment(id);

      if (!theComment) {
        util.setError(404, `Cannot find Comment with the id ${id}`);
      } else {
        util.setSuccess(200, "Found Comment", theComment);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteComment(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please provide a numeric value");
      return util.send(res);
    }

    try {
      const CommentToDelete = await CommentService.deleteComment(id);

      if (CommentToDelete) {
        util.setSuccess(200, "Comment deleted");
      } else {
        util.setError(404, `Comment with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async getMessageComments(req, res) {
    const { messageid } = req.params;

    if (!Number(messageid)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }

    try {
      const Comments = await CommentService.getMessageComments(messageid);

      if (!Comments) {
        util.setError(
          404,
          `Cannot find Comments with the messageid ${messageid}`
        );
      } else {
        util.setSuccess(200, "Found Comments", Comments);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }
}

export default CommentController;
