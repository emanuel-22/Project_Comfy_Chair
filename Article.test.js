const RegularArticle = require('./RegularArticle');
const Poster = require('./Poster');
const User = require('./User');


let regularArticle, posterArticle;


beforeEach( ()=> {
  userFirst = new User('Barboza', 'Laura', 'UNSa', 'barbozalau@gmail.com', 'asdasd');
  userSecond = new User('Martinez', 'Maria', 'UBA', 'mamaria@gmail.com', 'asdasd');
  userThird = new User('Barranco', 'Pablo', 'UNJu', 'pbarranco@gmail.com', 'asdasd');

  regularArticle = new RegularArticle(
    'IT Project Failures, Causes and Cures', 
    'https://refactoring.guru/design-patterns/state',
    'Despite decades of research, IT projects continue to experience high failure rates, often attributed to poor project management, cost estimation, and requirements gathering. However, simply identifying these causes is insufficient to prevent them. This study adopts an aviation-inspired accident investigation approach to explore the root causes of IT project failures. Through a forensic analysis of five large government IT projects in Denmark, we uncovered 37 root causes and 22 potential cures. Notably, only one cause was programming-related, and each project suffered from around 15 causes. Moreover, 27 of the identified causes are not reported in existing research literature, highlighting the importance of this study. The findings provide valuable insights for educators, policymakers, and practitioners, informing the development of targeted interventions to prevent IT project failures. By understanding the underlying causes, we can develop effective strategies to mitigate them, ultimately improving the success rates of IT projects.'
  );
  posterArticle = new Poster(
    'Implementacion de metodologia agil a organizaciones no gubernamentales', 
    'https://refactoring.guru/design-patterns/state',
    'https://refactoring.guru/design-patterns/state'
  );
});

describe("Un articulo regular", ()=>{
  it("puede tener varias autores",()=>{
    userFirst.add_role('Autor');
    regularArticle.add_author(userFirst);
    regularArticle.add_author(userSecond);
    expect(regularArticle.count_authors()).toBe(2);
  })

  it("no puede tener registrado el mismo autor 2 veces",()=>{
    userFirst.add_role('Autor');
    regularArticle.add_author(userFirst);
    regularArticle.add_author(userSecond);
   
    let duplicated = () => {regularArticle.add_author(userSecond)};
    expect(duplicated).toThrow();
  })

  it("debe tener titulo",()=>{
    userFirst.add_role('Autor');
    regularArticleInvalidated = new RegularArticle(
      '', 
      'https://refactoring.guru/design-patterns/state',
      'Despite decades of research, IT projects continue to experience high failure rates, often attributed to poor project management, cost estimation, and requirements gathering. However, simply identifying these causes is insufficient to prevent them. This study adopts an aviation-inspired accident investigation approach to explore the root causes of IT project failures. Through a forensic analysis of five large government IT projects in Denmark, we uncovered 37 root causes and 22 potential cures. Notably, only one cause was programming-related, and each project suffered from around 15 causes. Moreover, 27 of the identified causes are not reported in existing research literature, highlighting the importance of this study. The findings provide valuable insights for educators, policymakers, and practitioners, informing the development of targeted interventions to prevent IT project failures. By understanding the underlying causes, we can develop effective strategies to mitigate them, ultimately improving the success rates of IT projects.'
    );
    expect(regularArticleInvalidated.validated_title()).toBe(false);
  })

  it("debe tener una URL",()=>{
    userFirst.add_role('Autor');
    regularArticleInvalidated = new RegularArticle(
      'IT Project Failures, Causes and Cures', 
      '',
      'Despite decades of research, IT projects continue to experience high failure rates, often attributed to poor project management, cost estimation, and requirements gathering. However, simply identifying these causes is insufficient to prevent them. This study adopts an aviation-inspired accident investigation approach to explore the root causes of IT project failures. Through a forensic analysis of five large government IT projects in Denmark, we uncovered 37 root causes and 22 potential cures. Notably, only one cause was programming-related, and each project suffered from around 15 causes. Moreover, 27 of the identified causes are not reported in existing research literature, highlighting the importance of this study. The findings provide valuable insights for educators, policymakers, and practitioners, informing the development of targeted interventions to prevent IT project failures. By understanding the underlying causes, we can develop effective strategies to mitigate them, ultimately improving the success rates of IT projects.'
    );
    expect(regularArticleInvalidated.validated_attached_file_url()).toBe(false);
  })
})


describe("Un articulo poster", ()=>{
  it("puede tener varias autores",()=>{
    userSecond.add_role('Autor');
    posterArticle.add_author(userSecond);
    posterArticle.add_author(userFirst); // adentro asigno rol Autor
    expect(posterArticle.count_authors()).toBe(2);
  })

  it("no puede tener registrado el mismo autor 2 veces",()=>{
    userSecond.add_role('Autor');
    posterArticle.add_author(userSecond);
    posterArticle.add_author(userFirst); // adentro asigno rol Autor
   
    let duplicated = () => {posterArticle.add_author(userSecond)};
    expect(duplicated).toThrow();
  })

  it("debe tener titulo",()=>{
    userFirst.add_role('Autor');
    posterArticleInvalidated = new Poster(
      '', 
      'https://refactoring.guru/design-patterns/state',
      'https://refactoring.guru/design-patterns/state'
    );
    expect(posterArticleInvalidated.validated_title()).toBe(false);
  })

  it("debe tener una URL",()=>{
    userFirst.add_role('Autor');
    posterArticleInvalidated = new Poster(
      'IT Project Failures, Causes and Cures', 
      '',
      'https://refactoring.guru/design-patterns/state'
    );
    expect(posterArticleInvalidated.validated_attached_file_url()).toBe(false);
  })
})


