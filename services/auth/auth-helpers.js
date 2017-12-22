const bcrypt = require('bcrypt');

module.exports = {
  comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
  },
};
