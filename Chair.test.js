const Chair = require('./Chair');

let chair;

beforeEach( ()=> { 
  chair = new Chair();
});

describe("Un chair", ()=>{
  it("puede crear una conferencia",()=>{
    chair.create_conference('CACIC', '2024-06-15', '09:00', '2024-06-19', '18:00');
  })
})