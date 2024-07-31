
class SessionType {

  is_accepted(article) {
    throw new Error('Debe implementarse en las subclases');
  }
}

module.exports = SessionType;