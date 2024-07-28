class User {
  constructor(id, last_name, name, name_company, email, password) {
    this._id = id;
    this._last_name = last_name;
    this._name = name;
    this._name_company = name_company
    this._email = email;
    this._password = password;
    this._roles = [];
  }

  add_role(role){
    this._roles.push(role);
  }
}

module.exports = User;