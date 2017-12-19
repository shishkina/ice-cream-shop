const express = require('express');

const icecreamRouter = express.Router();
const icecreamController = require('../controllers/icecream-controller');

icecreamRouter.route('/')
  .get(icecreamController.index)
  .post(icecreamController.create);

icecreamRouter.route('/:id')
  .get(icecreamController.show)
  .put(icecreamController.update)
  .delete(icecreamController.delete);

module.exports = icecreamRouter;
