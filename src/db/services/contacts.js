import { ContactCollection } from '../models/contacts.js';

export const getContacts = async () => {
  const contacts = await ContactCollection.find();

  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactCollection.findById(contactId);

  return contact;
};
