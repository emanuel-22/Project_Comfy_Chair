const SessionType = require('./SessionType.js');

class PosterSession extends SessionType {
  constructor() {
    super('Sesion Poster');
  }

  validated_get_type(article){
    return article.get_type()==='Poster';
  }

  is_accepted(article) {
    return (this.validated_get_type(article) && this.validated_title(article) && this.validated_count_authors(article));
  }

  getDetails() {
    console.log(`El articulo Poster: ${this._title}`);
  }
}

module.exports = PosterSession;