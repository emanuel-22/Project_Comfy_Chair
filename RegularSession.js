
const TypeSession = require('./TypeSession.js');

class RegularSession extends TypeSession {
  is_accepted(article) {
    return article.getType() === 'regular';
  }
}

module.exports = RegularSession;