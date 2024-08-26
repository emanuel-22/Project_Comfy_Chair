const Chair = require('./Chair.js');
const Author = require('./Author.js');
const Reviewer = require('./Reviewer.js');


class User {
  constructor(last_name, name, company_name, email, password) {
    this._last_name = last_name;
    this._name = name;
    this._company_name = company_name
    this._email = email;
    this._password = password;
    this._roles = [];
  }

  roles(){
    return this._roles;
  }

  // Este es un methodo Factory
  create_role(role_name){
    switch (role_name) {
      case 'Autor':
        return new Author(this);
      case 'Chair':
        return new Chair(this);
      case 'Revisor':
        return new Reviewer(this);
      default:
        throw new Error('No se reconoce este tipo de rol');
    }
  }

  has_role(role_name) {
    return this._roles.some(role => role && role.name() === role_name);
  }

  find_role(roleName){
    return this._roles.find(role => role && role.name() === roleName);
  }

  add_role(role_name){
    let error_message = '';
    if(this.has_role(role_name)){
      error_message = 'Este usuario ya tiene este rol asignado'
    }
    if (this.find_role(role_name)) {
      error_message = 'No se reconoce este tipo de rol'
    }
    if (error_message) {
      throw new Error(error_message.trim());
    }else{
      const role = this.create_role(role_name);
      this._roles.push(role);
    }
  }

  create_conference(name, from_date, from_hour, to_date, to_hour){
    var chairRole = this.find_role('Chair')
    if (chairRole) {
      chairRole.create_conference(name, from_date, from_hour, to_date, to_hour)
    }else{
      throw new Error('El usuario no tiene permisos de Chair para crear conferencias');
    }
  }

  send_article(article, session, send_date){
    var author_role = this.find_role('Autor')
    if (author_role) {
      author_role.send_article(article, session, send_date)
    }else{
      throw new Error('El usuario no tiene permisos de Autor para mandar articulos a la sesion');
    }
  }

  assign_article_to_reviewer(article, session, reviewer){
    var chairRole = this.find_role('Chair')
    if (chairRole){
      chairRole.send_article_to_review(article, session, reviewer)
    }else{
      throw new Error('El usuario no tiene permisos de Chair para asignar articulos para revisión');
    }
  }

  send_bids(article, session, bid){
    var reviewer_role = this.find_role('Revisor')
    if (reviewer_role) {
      reviewer_role.send_bids(article, session, bid)
    }else{
      throw new Error('El usuario no tiene permisos de Revisor para enviar bids');
    }
  }


 






















  

 

  send_score(article, session, score, text){
    var reviewer_role = this.find_role('Revisor')
    if (reviewer_role) {
      reviewer_role.send_score(article, session, score, text)
    }else{
      throw new Error('El usuario no tiene permisos de Revisor para enviar calificación de este artículo');
    }
  }

}

module.exports = User;