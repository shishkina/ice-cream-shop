const db = require('../db/config');

module.exports = {
  findByUserName(username) {
    return db.oneOrNone(`
      SELECT *
      FROM users
      WHERE username = $1
      `, username);
  },
  create(user) {
    return db.one(`
      INSERT INTO users (username, email, password_digest)
      VALUES ($/username/, $/email/, $/password_digest/)
      RETURNING *
      `, user);
  },
};
