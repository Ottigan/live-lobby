import express from 'express';
import Database from '../db/Db';

const router = express.Router();

router.get('/', async (req, res) => {
  const { games } = Database;

  res.send(games);
});

export default router;
