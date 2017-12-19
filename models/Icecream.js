const db = require('../db/config');

class Icecream {
  constructor(icecream) {
    this.id = icecream.id || null;
    this.flavor = this.__validate(icecream.flavor, 'flavor');
    this.description = this.__validate(icecream.description, 'description');
    this.rating = this.__validate(icecream.rating, 'rating');
    this.url = this.__validate(icecream.url, 'url');
    this.brand = this.__validate(icecream.brand, 'brand');
  }

  __validate(property, propType) {
    if (propType === 'image' || propType === 'url') {
      const url = /^(https?:\/\/)?([\da-z\.-]+)\..*/;
      if (!property.match(url)) throw new Error('Invalid URL');
    }
    if (property) return property;
    else throw new Error(`Missing property ${propType}`);
  }

  __modify(changes) {
    for (let prop in changes) {
      this.__validate(changes[prop], prop);
    }
    return Object.assign(this, changes);
  }

  static findAll() {
    return db.manyOrNone('SELECT * FROM icecream');
  }

  static findById(id) {
    return db.one('SELECT * FROM icecream WHERE id = $1', id)
      .then(icecream => new Icecream(icecream));
  }

  static destroy(id) {
    return db.none('DELETE FROM icecream WHERE id = $1', id);
  }

  save() {
    return db.one(`
      INSERT INTO icecream
      (flavor, description, rating, url, brand)
      VALUES ($/flavor/, $/description/, $/rating/, $/url/, $/brand/)
      RETURNING *
    `, this).then(icecream => this.__modify(icecream));
  }

  update(changes) {
    this.__modify(changes);
    return db.one(`
      UPDATE icecream SET
      flavor = $/flavor/,
      description = $/description/,
      rating = $/rating/,
      url = $/url/,
      brand = $/brand/
      WHERE id = $/id/
      RETURNING *
    `, this).then(icecream => this.__modify(icecream));
  }

}

module.exports = Icecream;
