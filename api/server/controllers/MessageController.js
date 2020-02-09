import ChannelService from "../services/ChannelService";
import MessageService from "../services/MessageService";
import sgMail from "@sendgrid/mail";
import Util from "../utils/Utils";
import UserService from "../services/UserService";

const util = new Util();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class MessageController {
  static async getAllMessages(req, res) {
    try {
      const allMessages = await MessageService.getAllMessages();
      if (allMessages.length > 0) {
        util.setSuccess(200, "Messages retrieved", allMessages);
      } else {
        util.setSuccess(200, "No Messages found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addMessage(req, res) {
    if (
      !req.body.content ||
      !req.body.ChannelId ||
      !req.body.UserId ||
      !req.body.url
    ) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }
    const newMessage = req.body;
    try {
      const createdMessage = await MessageService.addMessage(newMessage);
      util.setSuccess(201, "Message Added!", createdMessage);

      // get notified users
      let notifiedUsers = await MessageService.getNotifiedUsers(
        req.body.ChannelId
      );

      // get first name and last name of user sending message
      let user = await UserService.getUserById(req.body.UserId);
      const usernameArray = user.username.split(" ");
      const userFirstInitial = user.username.substring(0, 1);
      const userFirstInitialLastName =
        userFirstInitial + ". " + usernameArray[1];

      //create link to message
      const link = `${req.body.url}/messages/${createdMessage.id}`;

      //filter non-priority
      if (!req.body.priority) {
        notifiedUsers = notifiedUsers.filter(
          notifiedUser => notifiedUser.type !== "priority"
        );
      }

      //get channel name for notification
      const channel = await ChannelService.getAChannel(req.body.ChannelId);
      if (notifiedUsers.length > 0) {
        const msg = {
          to: notifiedUsers.map(notification => notification.recipient),
          from: "notifications@collaboracast.com",
          subject: `${channel.name}: ${userFirstInitialLastName}`,
          html: `${req.body.content}\n\n${link}`
        };
        sgMail.send(msg);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedMessage(req, res) {
    const alteredMessage = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }
    try {
      const updateMessage = await MessageService.updateMessage(
        id,
        alteredMessage
      );
      if (!updateMessage) {
        util.setError(404, `Cannot find Message with the id: ${id}`);
      } else {
        util.setSuccess(200, "Message updated", updateMessage);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getAMessage(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }

    try {
      const theMessage = await MessageService.getAMessage(id);

      if (!theMessage) {
        util.setError(404, `Cannot find Message with the id ${id}`);
      } else {
        util.setSuccess(200, "Found Message", theMessage);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteMessage(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please provide a numeric value");
      return util.send(res);
    }

    try {
      const MessageToDelete = await MessageService.deleteMessage(id);

      if (MessageToDelete) {
        util.setSuccess(200, "Message deleted");
      } else {
        util.setError(404, `Message with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async getChannelMessages(req, res) {
    const { channelid } = req.params;

    if (!Number(channelid)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }

    try {
      const Messages = await MessageService.getChannelMessages(channelid);

      if (!Messages) {
        util.setError(
          404,
          `Cannot find Messages with the channelid ${channelid}`
        );
      } else {
        util.setSuccess(200, "Found Messages", Messages);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getMessagesByUser(req, res) {
    const { userId } = req.params;

    if (!userId) {
      util.setError(400, "Please input a valid user id");
      return util.send(res);
    }

    try {
      const Messages = await MessageService.getMessagesByUser(userId);

      if (!Messages) {
        util.setError(404, `Cannot find Messages with the user id ${userId}`);
      } else {
        util.setSuccess(200, "Found Messages", Messages);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getUserMessages(req, res) {
    const { email } = req.params;

    if (!email) {
      util.setError(400, "Please input a valid email");
      return util.send(res);
    }

    try {
      const Messages = await MessageService.getUserMessages(email);

      if (!Messages) {
        util.setError(404, `Cannot find Messages with the username ${email}`);
      } else {
        util.setSuccess(200, "Found Messages", Messages);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }
}

export default MessageController;
