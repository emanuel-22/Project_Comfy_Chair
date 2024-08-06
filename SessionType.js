
class SessionType {

  constructor(name) {
    this._name = name;
  }

  validated_abstract(article){
    throw new Error('Debe implementarse en las subclases');
  }


  is_accepted(article) {
    throw new Error('Debe implementarse en las subclases');
  }
}

module.exports = SessionType;