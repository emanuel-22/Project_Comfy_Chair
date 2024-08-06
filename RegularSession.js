
const SessionType = require('./SessionType.js');

class RegularSession extends SessionType {
  constructor() {
    super('Sesion Regular');
  }

  is_accepted(article) {
   return (article.get_type()==='regular' && article.validated_abstract() && article.validate_title() && (article.count_authors()>=1))
  }
}

module.exports = RegularSession;