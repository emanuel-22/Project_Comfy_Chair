const Conference = require('./Conference.js');
const Role = require('./Role.js');

class Chair extends Role {

  constructor(user) {
    super('Chair', user);
  }
  
  create_conference(name, from_date, from_hour, to_date, to_hour){
    return new Conference(name, from_date, from_hour, to_date, to_hour);
  }

}

module.exports = Chair;