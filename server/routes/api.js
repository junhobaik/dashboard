import express from 'express';

const router = express.Router();

router.get('/account', (req, res) => {
  res.json({
    user: req.user || null
  });
});

export default router;
