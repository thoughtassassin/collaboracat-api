import ContactService from "../services/ContactService";
import Util from "../utils/Utils";

const util = new Util();

class ContactController {
  static async getAllContacts(req, res) {
    try {
      const allContacts = await ContactService.getAllContacts();
      if (allContacts.length > 0) {
        util.setSuccess(200, "Contacts retrieved", allContacts);
      } else {
        util.setSuccess(200, "No Contact found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addContact(req, res) {
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.group ||
      !req.body.position ||
      !req.body.phone ||
      !req.body.address1 ||
      !req.body.city ||
      !req.body.state ||
      !req.body.zip ||
      !req.body.ChannelId
    ) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }
    const newContact = req.body;
    try {
      const createdContact = await ContactService.addContact(newContact);
      util.setSuccess(201, "Contact Added!", createdContact);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedContact(req, res) {
    const alteredContact = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }
    try {
      const updateContact = await ContactService.updateContact(
        id,
        alteredContact
      );
      if (!updateContact) {
        util.setError(404, `Cannot find Contact with the id: ${id}`);
      } else {
        util.setSuccess(200, "Contact updated", updateContact);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getAContact(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }

    try {
      const theContact = await ContactService.getAContact(id);

      if (!theContact) {
        util.setError(404, `Cannot find Contact with the id ${id}`);
      } else {
        util.setSuccess(200, "Found Contact", theContact);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteContact(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please provide a numeric value");
      return util.send(res);
    }

    try {
      const ContactToDelete = await ContactService.deleteContact(id);

      if (ContactToDelete) {
        util.setSuccess(200, "Contact deleted");
      } else {
        util.setError(404, `Contact with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async getChannelContacts(req, res) {
    const { channelid } = req.params;

    if (!Number(channelid)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }

    try {
      const contacts = await ContactService.getChannelContacts(channelid);

      if (!contacts) {
        util.setError(
          404,
          `Cannot find contacts with the channelid ${channelid}`
        );
      } else {
        util.setSuccess(200, "Found Contacts", contacts);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }
}

export default ContactController;
