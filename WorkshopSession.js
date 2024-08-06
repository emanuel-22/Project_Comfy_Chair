
const SessionType = require('./SessionType.js');

class WorkshopSession extends SessionType {

  constructor() {
    super('Sesion Workshop');
  }

 
  is_accepted(article) {
    let type = article.get_type();
    if (type==='regular'){
      return (article.validate_title() && (article.count_authors()>=1) && article.validated_abstract());
    }else{
      return (article.validate_title() && (article.count_authors()>=1));
    }
  }

}

module.exports = WorkshopSession;