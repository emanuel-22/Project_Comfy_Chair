const User = require('./User');

let user_first, user_second;

beforeEach( ()=> {
  user_first = new User('Barboza', 'Emanuel', 'UNSa', 'emanuelbarboza5@gmail.com', 'asdasd');
  user_second = new User('Mendez', 'Maria', 'UNLP', 'mariamendez@gmail.com', 'asdasd');
});

//----------------------------------------------------------------------
describe("Un usuario", ()=>{
  it("puede tener mas de un rol",()=>{
    user_first.add_role('Chair');
    user_first.add_role('Autor');
    expect(user_first.has_role('Chair')).toBe(true);
    expect(user_first.has_role('Autor')).toBe(true);
  })
  it("no puede tener el mismo rol 2 veces",()=>{
    user_first.add_role('Chair');
    user_first.add_role('Autor');
    let duplicate_role = ()=>{user_first.add_role('Autor')};
    expect(duplicate_role).toThrow();
  })
  it("no puede ingresarse un rol distinto de Chair, Autor o Revisor",()=>{
    expect(()=>{user_first.add_role('Administrador')}).toThrow();
  })
  it("sin rol Chair, no puede crear una conferencia",()=>{
    user_first.add_role('Autor');
    expect(() => {
      user_first.create_conference('IA International', '2023/06/12', '09:00', '2023/06/18', '18:00');
    }).toThrow();
  })
  it("puede tener mas de un rol",()=>{
    user_first.add_role('Chair');
    user_first.add_role('Autor');
    user_second.add_role('Autor');
    expect(user_first.has_role('Chair')).toBe(true);
    expect(user_first.has_role('Autor')).toBe(true);
    expect(user_second.has_role('Autor')).toBe(true);
  })
})

//--------------------------------------------
describe("Un Chair", ()=>{
  it("puede crear una conferencia",()=>{
    user_first.add_role('Chair');
    expect(() => {
      user_first.create_conference('IA International', '2023/06/12', '09:00', '2023/06/18', '18:00');
    }).not.toThrow();
  })
})



