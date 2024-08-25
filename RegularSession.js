
const SessionType = require('./SessionType.js');

class RegularSession extends SessionType {
  constructor() {
    super('Sesion Regular');
  }

  validated_get_type(article){
    return article.get_type()==='regular';
  }

  validated_abstract(article){
    return article.validated_abstract();
  }

  is_accepted(article) {
   return (this.validated_get_type(article) && this.validated_abstract(article) && this.validated_title(article) && this.validated_count_authors(article));
  }
}

module.exports = RegularSession;