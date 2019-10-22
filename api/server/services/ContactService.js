import database from "../src/models";

class ContactService {
  static async getAllContacts() {
    try {
      return await database.Contacts.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addContact(newContact) {
    try {
      return await database.Contacts.create(newContact);
    } catch (error) {
      throw error;
    }
  }

  static async updateContact(id, updateContact) {
    try {
      const ContactToUpdate = await database.Contacts.findOne({
        where: { id: Number(id) }
      });

      if (ContactToUpdate) {
        await database.Contacts.update(updateContact, {
          where: { id: Number(id) }
        });

        return updateContact;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAContact(id) {
    try {
      const theContact = await database.Contacts.findOne({
        where: { id: Number(id) }
      });

      return theContact;
    } catch (error) {
      throw error;
    }
  }

  static async deleteContact(id) {
    try {
      const ContactToDelete = await database.Contacts.findOne({
        where: { id: Number(id) }
      });

      if (ContactToDelete) {
        const deletedContact = await database.Contacts.destroy({
          where: { id: Number(id) }
        });
        return deletedContact;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default ContactService;
