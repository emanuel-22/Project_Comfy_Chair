
class SessionType {

  constructor(name) {
    this._name = name;
  }

  name(){
    return this._name;
  }

  is_accepted(article) {
    throw new Error('Debe implementarse en las subclases');
  }

  validated_abstract(article){
    throw new Error('Debe implementarse en las subclases');
  }

  validated_get_type(article){
    throw new Error('Debe implementarse en las subclases');
  }

  validated_title(article){
    return article.validated_title();
  }

  validated_count_authors(article){
    return article.count_authors()>=1;
  }

}

module.exports = SessionType;