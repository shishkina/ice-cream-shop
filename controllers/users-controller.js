const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = {
  create(req, res, next) {
    console.log(req, request);
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password_digest, salt);
    User.create({
      username:        req.body.username,
      email:           req.body.email,
      password_digest: hash,
    })
      .then(user => {
        req.login(user, (err) => {
          if (err) next(err);
          res.status(201).json({
            message: 'user created successfully',
            auth: true,
            data: { user },
          });
        });
      })
      .catch(next);
  },
};
