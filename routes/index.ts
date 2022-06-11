import express from 'express';
import categories from './categories';

const router = express.Router();

router.use('/categories', categories);

export default router;
