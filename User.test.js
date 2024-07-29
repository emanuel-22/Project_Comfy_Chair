const User = require('./User');
const Chair = require('./Chair');
const Author = require('./Author');
const Reviewer = require('./Reviewer');

let user;
let chair;
let author;
let reviewer;

beforeEach( ()=> {
  user = new User('Barboza', 'Emanuel', 'UNSa', 'emanuelbarboza5@gmail.com', 'asdasd');
  chair = new Chair();
  author = new Author();
  reviewer = new Reviewer();
});

describe("Un usuario", ()=>{
  it("puede tener mas de un rol",()=>{
    user.add_role(chair);
    user.add_role(author);
    // expect(user.has_role('chair')).toBe(true);
    // expect(user.has_role('author')).toBe(true);
    expect(user.roles()).toContain(chair);
    expect(user.roles()).toContain(author);
  })

  it("no puede tener el mismo rol 2 veces",()=>{
    user.add_role(chair);
    user.add_role(author);
    let duplicate_role = ()=>{user.add_role(chair)};
    expect(duplicate_role).toThrow();
  })
})

