const Role = require('./Role.js');


class Reviewer extends Role{
  constructor() {
    super('Revisor');
  }

}

module.exports = Reviewer;