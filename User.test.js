const User = require('./User');
let user, user2;

beforeEach( ()=> {
  user = new User('Barboza', 'Emanuel', 'UNSa', 'emanuelbarboza5@gmail.com', 'asdasd');
  user2 = new User('Barboza', 'Maria', 'UNLP', 'mariabarboza@gmail.com', 'asdasd');
});

describe("Un usuario", ()=>{
  it("puede tener mas de un rol",()=>{
    user.add_role('Chair');
    user.add_role('Autor');
    expect(user.has_role('Chair')).toBe(true);
    expect(user.has_role('Autor')).toBe(true);
  })

  it("no puede tener el mismo rol 2 veces",()=>{
    user.add_role('Chair');
    user.add_role('Autor');
    let duplicate_role = ()=>{user.add_role('Autor')};
    expect(duplicate_role).toThrow();
  })

  it("no puede ingresarse un rol distinto de Chair, Autor o Revisor",()=>{
    expect(()=>{user.add_role('Administrador')}).toThrow();
  })


  it("sin rol Chair, no puede crear una conferencia",()=>{
    user.add_role('Autor');
    expect(() => {
      user.create_conference('IA International', '2023/06/12', '09:00', '2023/06/18', '18:00');
    }).toThrow();
  })

  it("puede tener mas de un rol",()=>{
    user.add_role('Chair');
    user.add_role('Autor');
    user2.add_role('Autor');

    expect(user.has_role('Chair')).toBe(true);
    expect(user.has_role('Autor')).toBe(true);
    expect(user2.has_role('Autor')).toBe(true);

    console.log(user);
    console.log(user2);

  })
})

