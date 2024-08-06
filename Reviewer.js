const Role = require('./Role.js');


class Reviewer extends Role{
  constructor(user) {
    super('Revisor', user);
  }

}

module.exports = Reviewer;