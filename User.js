const Chair = require('./Chair.js');
const Author = require('./Author.js');
const Reviewer = require('./Reviewer.js');


class User {
  constructor(last_name, name, name_company, email, password) {
    this._last_name = last_name;
    this._name = name;
    this._name_company = name_company
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
        throw new Error('No se reconoce este rol');
    }
  }

  has_role(role_name) {
    return this._roles.some(role => role._name === role_name);
  }

  find_role(roleName){
    return this._roles.find(role => role._name === roleName);
  }

  add_role(role_name){
    if (!this.has_role(role_name)){
      const role = this.create_role(role_name)
      if (role){
        this._roles.push(role);
      } else {
        throw new Error('No se reconoce este rol');
      }
    } else {
      throw new Error('Este usuario ya tiene este rol asignado');
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
    var authorRole = this.find_role('Autor')
    if (authorRole) {
      authorRole.send_article(article, session, send_date)
    }else{
      throw new Error('El usuario no tiene permisos de Autor para mandar articulos a la sesion');
    }
  }

  
}

module.exports = User;