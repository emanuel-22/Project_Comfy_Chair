
const TypeSession = require('./TypeSession.js');

class WorkshopSession extends TypeSession {

  is_accepted(article) {
    const type = article.getType();
    return type === 'regular' || type === 'poster';
  }

}

module.exports = WorkshopSession;