import express from 'express';
import categories from './categories';
import games from './games';
import widgets from './widgets';

const router = express.Router()
  .use('/categories', categories)
  .use('/games', games)
  .use('/widgets', widgets);

export default router;
