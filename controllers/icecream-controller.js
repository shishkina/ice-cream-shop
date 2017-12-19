const Icecream = require('../models/Icecream');

const icecreamController = {};

icecreamController.index = (req, res, next) => {
  Icecream.findAll()
    .then(icecreams => {
      res.status(200).json({
        message: 'ok',
        data: {
          icecreams,
        },
      });
    })
    .catch(next);
};

icecreamController.show = (req, res, next) => {
  Icecream.findById(req.params.id)
    .then(icecream => {
      res.status(200).json({
        message: 'ok',
        data: {
          icecream,
        },
      });
    }).catch(next);
};

icecreamController.create = (req, res, next) => {
  try {
    new Icecream({
      flavor: req.body.flavor,
      description: req.body.description,
      rating: req.body.rating,
      url: req.body.url,
      brand: req.body.brand,
    })
      .save()
      .then(icecream => {
        res.status(201).json({
          message: 'Ice cream successfully created',
          data: {
            icecream,
          },
        });
      }).catch(next);
  } catch (err) {
    return next(err);
  }
};

icecreamController.update = (req, res, next) => {
  Icecream.findById(req.params.id)
    .then(icecream => {
      return icecream.update({
        flavor: req.body.flavor,
        description: req.body.description,
        rating: req.body.rating,
        url: req.body.url,
        brand: req.body.brand,
      })
    }).then(icecream => {
      res.status(202).json({
        message: 'Ice cream successfully updated',
        data: {
          icecream,
        },
      });
    }).catch(next);
};

icecreamController.delete = (req, res, next) => {
  Icecream.destroy(req.params.id)
    .then(() => {
      res.status(202).json({
        message: 'Ice cream successfully deleted',
      });
    }).catch(next);
}

module.exports = icecreamController;
