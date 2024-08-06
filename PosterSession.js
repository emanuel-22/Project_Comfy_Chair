const SessionType = require('./SessionType.js');

class PosterSession extends SessionType {
  constructor() {
    super('Sesion Poster');
  }
  is_accepted(article) {
    return (article.get_type()==='poster' && article.validate_title() && (article.count_authors()>=1));
  }
}

module.exports = PosterSession;