class Role {

  constructor(user) {
    this._user = user;
  }

  user(){
    return this._user;
  }

  name(){
    throw new Error('Este método se implementa en la subclase');
  }

  create_conference(name, from_date, from_hour, to_date, to_hour){
    throw new Error('Este método se implementa en la subclase');
  }



    
}

module.exports = Role;