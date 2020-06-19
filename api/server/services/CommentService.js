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
        where: { id: Number(id) },
      });

      if (CommentToUpdate) {
        await database.Comments.update(updateComment, {
          where: { id: Number(id) },
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
        where: { id: Number(id) },
      });

      return theComment;
    } catch (error) {
      throw error;
    }
  }

  static async deleteComment(id) {
    try {
      const CommentToDelete = await database.Comments.findOne({
        where: { id: Number(id) },
      });

      if (CommentToDelete) {
        const deletedComment = await database.Comments.destroy({
          where: { id: Number(id) },
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
        where: { MessageId: Number(MessageId) },
      });

      return messageComments;
    } catch (error) {
      throw error;
    }
  }

  static async getNotifiedUsers(messageId) {
    const query = `SELECT "Messages"."UserId", "Users"."phone", "Providers"."domain"
                    FROM "Messages"
                    JOIN "Users" ON "Messages"."UserId" = "Users"."id"
                    JOIN "Providers" ON "Providers"."id" = "Users"."ProviderId"
                    WHERE "Messages"."id" = :messageId
                    UNION
                    SELECT "Comments"."UserId", "Users"."phone", "Providers"."domain"
                    FROM "Messages"
                    JOIN "Comments" ON "Comments"."MessageId" = "Messages"."id"
                    JOIN "Users" ON "Comments"."UserId" = "Users"."id"
                    JOIN "Providers" ON "Providers"."id" = "Users"."ProviderId"
                    WHERE "Messages"."id" = :messageId`;
    try {
      const messageNotifications = await database.sequelize.query(query, {
        replacements: { messageId },
        type: database.sequelize.QueryTypes.SELECT,
      });
      return messageNotifications.reduce((notifications, notification) => {
        if (notification.phone && notification.domain) {
          notifications.push({
            recipient:
              notification.phone.replace(/-/g, "") + "@" + notification.domain,
          });
        }
        // filter duplicate email addresses
        return notifications.filter(
          (notification, index, self) =>
            index ===
            self.findIndex((n) => n.recipient === notification.recipient)
        );
      }, []);
    } catch (error) {
      throw error;
    }
  }
}

export default CommentService;
