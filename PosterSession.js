const SessionType = require('./SessionType.js');

class PosterSession extends SessionType {
  is_accepted(article) {
    return article.get_type()==='poster';
  }
}

module.exports = PosterSession;