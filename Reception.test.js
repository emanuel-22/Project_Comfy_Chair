const Session = require('./Session');
const RegularSession = require('./RegularSession');
const WorkshopSession = require('./WorkshopSession');
const PosterSession = require('./PosterSession');

const User = require('./User');
const Author = require('./Author');

const RegularArticle = require('./RegularArticle');
const Poster = require('./Poster');


let regularSessionType;
let workshopSessionType;
let posterSessionType;

beforeEach( ()=> {
  user_first = new User('Emanuel', 'Barboza', 'UNSa', 'emanuel@gmail.com', 'asdasd');
  user_first.add_role('Autor');

  regularArticle = new RegularArticle('Razones de fracaso de desarrollo de software', 'https://refactoring.guru/design-patterns/state');
  posterArticle = new Poster('Implementacion de metodologia agil a organizaciones no gubernamentales', 'https://refactoring.guru/design-patterns/state');

  regularArticle.add_author(user_first)
  posterArticle.add_author(user_first)

  regularSessionType = new Session('Agentes y Sistemas Inteligentes', new RegularSession());
  workshopSessionType = new Session('Agentes y Sistemas Inteligentes', new WorkshopSession());
  posterSessionType = new Session('Agentes y Sistemas Inteligentes', new PosterSession());

});

describe("Las sesiones regulares", ()=>{
  it("solo admiten articulos de tipo regular",()=>{
    regularSessionType.add_article(regularArticle)
    expect(regularSessionType.articles()).toContain(regularArticle);
  })
  it("no admiten posters",()=>{
    let send_poster = ()=>{regularSessionType.add_article(posterArticle)};
    expect(send_poster).toThrow();
  })
})

describe("Las sesiones de workshops", ()=>{
  it("admiten articulos de tipo regular",()=>{
    workshopSessionType.add_article(regularArticle)
    expect(workshopSessionType.articles()).toContain(regularArticle);
  })
  it("admiten articulos de tipo posters",()=>{
    workshopSessionType.add_article(posterArticle)
    expect(workshopSessionType.articles()).toContain(posterArticle);
  })
})

describe("Las sesiones de posters", ()=>{
  it("admiten articulos de tipo poster",()=>{
    posterSessionType.add_article(posterArticle)
    expect(posterSessionType.articles()).toContain(posterArticle);
  })
  it("no admiten articulos de tipo articulos regulares",()=>{
    let send_regular_article = ()=>{posterSessionType.add_article(regularArticle)};
    expect(send_regular_article).toThrow();
  })
})