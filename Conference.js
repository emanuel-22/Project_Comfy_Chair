
const RegularSession = require('./RegularSession.js');
const WorkshopSession = require('./WorkshopSession.js');
const PosterSession = require('./PosterSession.js');
const Session = require('./Session.js');


class Conference {
  
  constructor(name, from_date, from_hour, to_date, to_hour) {
    this._name = name;
    this._from_date = from_date;
    this._to_date = to_date;
    this._from_hour = from_hour;
    this._to_hour = to_hour;
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

  add_session(session_name, type_session, reception_deadline){
    if (!this.has_session(session_name, type_session)){
      const session = this.create_session(session_name, type_session, reception_deadline)
      if (session){
        this._sessions.push(session);
      } else {
        throw new Error('No se reconoce este tipo de session');
      }
    } else {
      throw new Error('Este tipo de session con este nombre ya fue agregado a la conferencia');
    }
  }

  add_chairs(chair){
    this._chairs.push(chair);
  }

  add_program_committee(reviewer){
    this._program_committee.push(reviewer);
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