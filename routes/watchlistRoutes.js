const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET watchlist
router.get('/', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json({ watchlist: user.watchlist });
});

// ADD to watchlist
router.post('/add', authMiddleware, async (req, res) => {
  const { movieId } = req.body;
  const user = await User.findById(req.userId);

  if (!user.watchlist.includes(movieId)) {
    user.watchlist.push(movieId);
    await user.save();
  }

  res.json({ watchlist: user.watchlist });
});

// REMOVE from watchlist
router.delete('/remove/:movieId', authMiddleware, async (req, res) => {
  const movieId = Number(req.params.movieId);
  const user = await User.findById(req.userId);

  user.watchlist = user.watchlist.filter((id) => id !== movieId);
  await user.save();

  res.json({ watchlist: user.watchlist });
});

module.exports = router;