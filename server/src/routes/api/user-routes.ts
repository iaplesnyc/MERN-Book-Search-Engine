import express from 'express';
const router = express.Router();

// 🛑 Deleted all unused imports (createUser, login, etc.)

router.get('/', (_req, res) => {
  res.json({ message: 'API is running. Use /graphql instead.' });
});

export default router;
