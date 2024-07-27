class Conference {
  constructor(name) {
    this._name = name;
  }

  get_name(){
    return this._name;
  }

}

module.exports = Conference;