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

  add_session(session){
    this._sessions.push(session);
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