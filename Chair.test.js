const Conference = require('./Conference');
const User = require('./User');
let user;

beforeEach( ()=> {
  user = new User('Barboza', 'Emanuel', 'UNSa', 'emanuelbarboza5@gmail.com', 'asdasd');
  user.add_role('Chair');
});


describe("Un chair", ()=>{
  it("puede crear una conferencia",()=>{
    expect(() => {
      user.create_conference('IA International', '2023/06/12', '09:00', '2023/06/18', '18:00');
    }).not.toThrow();
  })

  it("agrega chairs",()=>{
    conference = user.create_conference('IA International', '2023/06/12', '09:00', '2023/06/18', '18:00');
    console.log(conference);
  })

})




