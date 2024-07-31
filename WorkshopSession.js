
const SessionType = require('./SessionType.js');

class WorkshopSession extends SessionType {

  is_accepted(article) {
    const type = article.get_type();
    return type === 'regular' || type === 'poster';
  }

}

module.exports = WorkshopSession;