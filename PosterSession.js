const TypeSession = require('./TypeSession.js');

class PosterSession extends TypeSession {
  is_accepted(article) {
    return article.getType()==='poster';
  }
}

module.exports = PosterSession;