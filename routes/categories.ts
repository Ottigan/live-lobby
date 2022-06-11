import express from 'express';
import Database from '../db/Db';

const router = express.Router();

router.get('/', async (req, res) => {
  const { categories } = Database;

  res.send(categories);
});

export default router;
