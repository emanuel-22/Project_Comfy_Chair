const Session = require('./Session');
const RegularSession = require('./RegularSession');
const Author = require('./Author');
const RegularArticle = require('./RegularArticle');
const Poster = require('./Poster');


let regularSession;
let regularSessionType;

beforeEach( ()=> {
  first_author = new Author('Emanuel', 'Barboza', 'UNSa', 'emanuel@gmail.com', 'asdasd');
  second_author = new Author('Jose', 'Balas', 'UNLP', 'jose@gmail.com', 'asdasd');

  regularArticle = new RegularArticle('Razones de fracaso de desarrollo de software', 'https://refactoring.guru/design-patterns/state');
  posterArticle = new Poster('Implementacion de metodologia agil a organizaciones no gubernamentales', 'https://refactoring.guru/design-patterns/state');

  regularArticle.push(first_author)
  posterArticle.push(second_author)

  regularSession = new RegularSession();
  regularSessionType = new Session('Agentes y Sistemas Inteligentes', regularSession);
});

describe("Una conferencia ", ()=>{
  it("puede tener varias sesiones",()=>{
    conference.add_session(session1);
    conference.add_session(session2);
    conference.add_session(session3);
    conference.add_session(session4);
    expect(conference.sessions()).toEqual([session1,session2,session3,session4]);
  })
})