const Conference = require('./Conference.js');

class Chair {
  
    create_conference(name, from_date, from_hour, to_date, to_hour){
        return new Conference(name, from_date, from_hour, to_date, to_hour);
    }
}

module.exports = Chair;