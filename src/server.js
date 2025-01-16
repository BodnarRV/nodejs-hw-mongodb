import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnv } from './utils/getEnv.js';
import { ENV_VARS } from './constants/env.js';
import { getContactById, getContacts } from './db/services/contacts.js';

const app = express();

app.use(cors());

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.get('/contacts', async (req, res) => {
  const contacts = await getContacts();
  res.json(contacts);
});

app.get('/contacts/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const contact = getContactById(contactId);

  if (!contact) {
    return res.status(404).json({
      status: 404,
      message: 'Contact not found',
    });
  }

  res.json(contact);
});

const PORT = getEnv(ENV_VARS.PORT, 3000);
export const setupServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
