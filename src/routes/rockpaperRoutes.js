const express = require('express');
const auth = require('../middleware/auth');
const startrpc = require('../controllers/rockpaperController');
const rockRouter = express.Router();

// rockRouter.use(auth());
rockRouter.get('/start',auth,startrpc);

module.exports = rockRouter;