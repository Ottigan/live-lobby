import express from 'express';
import Database from '../db/Db';

const router = express.Router();

router.get('/', async (req, res) => {
  const { widgets } = Database;

  res.send(widgets);
});

export default router;
