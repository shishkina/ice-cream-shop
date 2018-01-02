const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = {
  create(req, res, next) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    User.create({
      username:        req.body.username,
      email:           req.body.email,
      password_digest: hash,
    })
      .then(user => {
        req.login(user, (err) => {
          if (err) console.log(err, 'this is error');
          res.json({
            message: 'user created successfully',
            auth: true,
            data: { user },
          });
        });
      })
      .catch(next);
  },
};
