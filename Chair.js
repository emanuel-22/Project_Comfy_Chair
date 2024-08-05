const Conference = require('./Conference.js');
const Role = require('./Role.js');

class Chair extends Role {

  constructor() {
    super('Chair');
  }
  
  create_conference(name, from_date, from_hour, to_date, to_hour){
    return new Conference(name, from_date, from_hour, to_date, to_hour);
  }


  get_conference(){
    
  }
}

module.exports = Chair;