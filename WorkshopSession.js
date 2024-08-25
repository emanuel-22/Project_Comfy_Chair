
const SessionType = require('./SessionType.js');

class WorkshopSession extends SessionType {

  constructor() {
    super('Sesion Workshop');
  }

  validated_abstract(article){
    return article.validated_abstract();
  }

  is_accepted(article) {
    let type = article.get_type();
    if (type==='regular'){
      return (this.validated_title(article) && this.validated_count_authors(article) && this.validated_abstract(article));
    }else{
      return (this.validated_title(article) && this.validated_count_authors(article));
    }
  }

}

module.exports = WorkshopSession;