import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

setupServer();
initMongoConnection();
