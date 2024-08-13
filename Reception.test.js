const Session = require('./Session');
const RegularSession = require('./RegularSession');
const WorkshopSession = require('./WorkshopSession');
const PosterSession = require('./PosterSession');

const User = require('./User');
const RegularArticle = require('./RegularArticle');
const Poster = require('./Poster');


let regularSessionType, workshopSessionType, posterSessionType;

beforeEach( ()=> {
  timestamp = Date.now();
  date = new Date(timestamp);
  date_finally = date.toISOString().split('T')[0];

  user_first = new User('Emanuel', 'Barboza', 'UNSa', 'emanuel@gmail.com', 'asdasd');
  user_first.add_role('Autor');

  regularArticle = new RegularArticle(
    'IT Project Failures, Causes and Cures', 
    'https://refactoring.guru/design-patterns/state',
    'Despite decades of research, IT projects continue to experience high failure rates, often attributed to poor project management, cost estimation, and requirements gathering. However, simply identifying these causes is insufficient to prevent them. This study adopts an aviation-inspired accident investigation approach to explore the root causes of IT project failures. Through a forensic analysis of five large government IT projects in Denmark, we uncovered 37 root causes and 22 potential cures. Notably, only one cause was programming-related, and each project suffered from around 15 causes. Moreover, 27 of the identified causes are not reported in existing research literature, highlighting the importance of this study. The findings provide valuable insights for educators, policymakers, and practitioners, informing the development of targeted interventions to prevent IT project failures. By understanding the underlying causes, we can develop effective strategies to mitigate them, ultimately improving the success rates of IT projects.'
  );
  regularArticleInval = new RegularArticle(
    'IT Project Failures, Causes and Cures', 
    'https://refactoring.guru/design-patterns/state',
    'Despite decades of research, IT projects continue to experience high failure rates, often attributed to poor project management, cost estimation, and requirements gathering. However, simply identifying these causes is insufficient to prevent them. This study adopts an aviation-inspired accident investigation approach to explore the root causes of IT project failures. Through a forensic analysis of five large government IT projects in Denmark, we uncovered 37 root causes and 22 potential cures. Notably, only one cause was programming-related, and each project suffered from around 15 causes. Moreover, 27 of the identified causes are not reported in existing research literature, highlighting the importance of this study. The findings provide valuable insights for educators, policymakers, and practitioners, informing the development of targeted interventions to prevent IT project failures. By understanding the underlying causes, we can develop effective strategies to mitigate them, ultimately improving the success rates of IT projects. '+
    'Despite decades of research, IT projects continue to experience high failure rates, often attributed to poor project management, cost estimation, and requirements gathering. However, simply identifying these causes is insufficient to prevent them. This study adopts an aviation-inspired accident investigation approach to explore the root causes of IT project failures. Through a forensic analysis of five large government IT projects in Denmark, we uncovered 37 root causes and 22 potential cures. Notably, only one cause was programming-related, and each project suffered from around 15 causes. Moreover, 27 of the identified causes are not reported in existing research literature, highlighting the importance of this study. The findings provide valuable insights for educators, policymakers, and practitioners, informing the development of targeted interventions to prevent IT project failures. By understanding the underlying causes, we can develop effective strategies to mitigate them, ultimately improving the success rates of IT projects. Despite decades of research, IT projects continue to experience high failure rates, often attributed to poor project management, cost estimation, and requirements gathering. However, simply identifying these causes is insufficient to prevent them. This study adopts an aviation-inspired accident investigation approach to explore the root causes of IT project failures. Through a forensic analysis of five large government IT projects in Denmark, we uncovered 37 root causes and 22 potential cures. Notably, only one cause was programming-related, and each project suffered from around 15 causes'
  );
  posterArticle = new Poster(
    'Implementacion de metodologia agil a organizaciones no gubernamentales', 
    'https://refactoring.guru/design-patterns/state',
    'https://refactoring.guru/design-patterns/state'
  );

  regularSessionType = new Session('Agentes y Sistemas Inteligentes', new RegularSession(), date_finally);
  workshopSessionType = new Session('Agentes y Sistemas Inteligentes', new WorkshopSession(), date_finally);
  posterSessionType = new Session('Agentes y Sistemas Inteligentes', new PosterSession(), date_finally);

});

describe("Las sesiones regulares", ()=>{
  it("solo admiten articulos de tipo regular",()=>{
    regularArticle.add_author(user_first)
    regularSessionType.receive_article(regularArticle, date_finally)
    expect(regularSessionType.articles()).toContain(regularArticle);
  })
  it("no admiten posters",()=>{
    let send_poster = ()=>{regularSessionType.receive_article(posterArticle, date_finally)};
    expect(send_poster).toThrow();
  })
  it("no admiten articulos de tipo regular con asbtract de mas de 300 palabras",()=>{
    let invalidet_article = ()=>{
      regularArticleInval.add_author(user_first);
      regularSessionType.receive_article(regularArticleInval, date_finally);
    };
    expect(invalidet_article).toThrow();
  })
  it("no admiten articulos de tipo regular sin autores",()=>{
    let invalidet_article = ()=>{regularSessionType.receive_article(regularArticle, date_finally)};
    expect(invalidet_article).toThrow();
  })
})

describe("Las sesiones de workshops", ()=>{
  //---------------------------Regulares-------------------------
  it("admiten articulos de tipo regular",()=>{
    regularArticle.add_author(user_first)
    workshopSessionType.receive_article(regularArticle, date_finally)
    expect(workshopSessionType.articles()).toContain(regularArticle);
  })
  it("no admiten articulos de tipo regular con abstract de mas de 300 palabras",()=>{
    let invalidet_article = ()=>{
      regularArticleInval.add_author(user_first);
      workshopSessionType.receive_article(regularArticleInval, date_finally)
    };
    expect(invalidet_article).toThrow();
  })
  it("no admiten articulos de tipo regular sin autores",()=>{
    let invalidet_article = ()=>{workshopSessionType.receive_article(regularArticle, date_finally)};
    expect(invalidet_article).toThrow();
  })

  //---------------------------Posters-------------------------
  it("admiten articulos de tipo posters",()=>{
    posterArticle.add_author(user_first)
    workshopSessionType.receive_article(posterArticle,date_finally)
    expect(workshopSessionType.articles()).toContain(posterArticle);
  })
  it("no admiten articulos de tipo poster sin autores",()=>{
    let invalidet_article = ()=>{workshopSessionType.receive_article(posterArticle, date_finally)};
    expect(invalidet_article).toThrow();
  })
})

describe("Las sesiones de posters", ()=>{
  it("admiten articulos de tipo poster",()=>{
    posterArticle.add_author(user_first)
    posterSessionType.receive_article(posterArticle, date_finally)
    expect(posterSessionType.articles()).toContain(posterArticle);
  })
  it("no admiten articulos de tipo articulos regulares",()=>{
    let send_regular_article = ()=>{posterSessionType.receive_article(regularArticle,date_finally)};
    expect(send_regular_article).toThrow();
  })
  it("no admiten articulos de tipo poster sin autores",()=>{
    let invalidet_article = ()=>{posterSessionType.receive_article(posterArticle, date_finally)};
    expect(invalidet_article).toThrow();
  })
})

//--------------------------------------------
describe("Un Autor", ()=>{
  it("puede enviar un articulo a una session",()=>{
    expect(() => {
      regularArticle.add_author(user_first)
      user_first.send_article(regularArticle, regularSessionType, date_finally)
    }).not.toThrow();
  })
})
