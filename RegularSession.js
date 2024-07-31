
const SessionType = require('./SessionType.js');

class RegularSession extends SessionType {
  constructor() {
    super();
  }

  is_accepted(article) {
    return article.get_type()==='regular';
  }
}

module.exports = RegularSession;