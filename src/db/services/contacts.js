import { SORT_ORDER } from '../../constants/index.js';
import { calculatePaginationData } from '../../utils/calculatePaginationData.js';
import { ContactCollection } from '../models/contacts.js';

export const getContacts = async ({
  userId,
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactCollection.find({ userId });
  const contactsCount = await ContactCollection.find({
    userId,
  }).countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return { data: contacts, ...paginationData };
};

export const getContactById = async (contactId, userId) => {
  return await ContactCollection.findOne({ _id: contactId, userId });
};

export const createContact = async (payload) => {
  return await ContactCollection.create(payload);
};

export const deleteContact = async (contactId, userId) => {
  return await ContactCollection.findOneAndDelete({ _id: contactId, userId });
};

export const updateContact = async (
  userId,
  contactId,
  payload,
  options = {},
) => {
  const rawResult = await ContactCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    { new: true, includeResultMetadata: true, ...options },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
