const RegularSession = require('./RegularSession.js');
const WorkshopSession = require('./WorkshopSession.js');
const PosterSession = require('./PosterSession.js');
const Session = require('./Session.js');

class Conference {
  
  constructor(name, from_date, from_hours, to_date, to_hours) {
    this._name = name;
    this._from_date = from_date;
    this._to_date = to_date;
    this._from_hours = from_hours;
    this._to_hours = to_hours;
    
    this._sessions = [];
    this._chairs = [];
    this._program_committee = [];
  }

  name(){
    return this._name;
  }

  // Este es un methodo Factory
  create_session(session_name, type_name, reception_deadline){
    switch (type_name) {
      case 'Sesion Regular':
        return new Session(session_name, new RegularSession(), reception_deadline);
      case 'Sesion Workshop':
        return new Session(session_name, new WorkshopSession(), reception_deadline);
      case 'Sesion Poster':
        return new Session(session_name, new PosterSession(), reception_deadline);
      default:
        throw new Error('No se reconoce este tipo de sesion');
    }
  }

  has_session(session_name, type_session){
    return this._sessions.some(
      session => (session._topic_name === session_name && session._session_type._name === type_session)
    );
  }

  find_session(session_name, type_session){
    return this._sessions.find(
      session => (session._topic_name === session_name && session._session_type._name === type_session)
    );
  }
  
  add_session(session_name, type_session, reception_deadline){
    let error_message = '';
    if(this.has_session(session_name, type_session)){
      error_message = 'Este tipo de session con este nombre ya fue agregado a la conferencia'
    }  
    if (this.find_session(session_name, type_session)) {
      error_message = 'No se reconoce este tipo de sesión'
    }
    if (error_message) {
      throw new Error(error_message.trim());
    }else{
      const session = this.create_session(session_name, type_session, reception_deadline)
      this._sessions.push(session);
    } 
  }

  has_chair(user){
    return this._chairs.some(chair => chair && (chair.user()===user));
  }

  add_chairs(user){
    if(!this.has_chair(user)){
      if(!user.has_role('Chair')){
        user.add_role('Chair')
      }
      const chair = user.find_role('Chair')
      this._chairs.push(chair);
    }else{
      throw new Error('Este usuario ya se encuentra en la lista de chairs de la conferencia');
    }
  }

  has_reviewer(user){
    return this._program_committee.some(reviewer => reviewer && (reviewer.user()===user));
  }

  add_program_committee(user){
    if(!this.has_reviewer(user)){
      if(!user.has_role('Revisor')){
        user.add_role('Revisor')
      }
      const reviewer = user.find_role('Revisor')
      this._program_committee.push(reviewer);
    }else{
      throw new Error('Este usuario ya se encuentra en el comité del programa de la conferencia');
    }
  }

  sessions(){
    return this._sessions;
  }

  chairs(){
    return this._chairs;
  }

  program_committee(){
    return this._program_committee;
  }

}

module.exports = Conference;