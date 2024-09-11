const RegularArticle = require('./RegularArticle');
const Poster = require('./Poster');
const User = require('./User');

let regularArticle, posterArticle;

beforeEach( ()=> {
  userFirst = new User('Barboza', 'Laura', 'UNSa', 'barbozalau@gmail.com', 'asdasd');
  userSecond = new User('Martinez', 'Maria', 'UBA', 'mamaria@gmail.com', 'asdasd');
  userThird = new User('Barranco', 'Pablo', 'UNJu', 'pbarranco@gmail.com', 'asdasd');
  userFourth = new User('Abregu', 'Lucas', 'UNSa', 'luabregu@gmail.com', 'asdasd');

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

  users = [ userFirst, userSecond, userThird, userFourth ];

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
   
    let duplicated_author = () => {regularArticle.add_author(userSecond)};
    expect(duplicated_author).toThrow();
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
   
    let duplicated_author = () => {posterArticle.add_author(userSecond)};
    expect(duplicated_author).toThrow();
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

describe("Un articulo regular o poster", ()=>{
  
  it("debe mostrar un error si se intenta enviar un artículo a un revisor duplicado",()=>{
    regularArticle.process_add_to_pending(userFirst);
    expect(() => regularArticle.process_add_to_pending(userFirst)).toThrow();
  });

  it("debe asignar correctamente el bid a un revisor", () => {
    regularArticle.process_add_to_pending(userFirst);
    regularArticle.process_assign_bid('Interesado', userFirst);
    const reviewerArticle = regularArticle.find_user_in_list_reviewer(userFirst);
    expect(reviewerArticle.bid()).toBe('Interesado');
  });

  it("mostrar error si el bid no es válido", () => {
    regularArticle.process_add_to_pending(userFirst);
    expect(() => article.process_assign_bid('Invalido', userFirst)).toThrow();
  });

  it("debería asignar revisores 'interesados'", () => {
    users.forEach(user => posterArticle.process_add_to_pending(user));
    posterArticle.process_assign_bid('Interesado', users[0]);
    posterArticle.process_assign_bid('Interesado', users[1]);
    posterArticle.process_assign_bid('Interesado', users[2]);
    posterArticle.process_assign_reviewers();
    expect(posterArticle.count_confirmed_reviewers_article()).toBe(3);
    expect(posterArticle.count_interesteds()).toBe(3);
    expect(posterArticle.count_maybes()).toBe(0);
    expect(posterArticle.count_not_interesteds()).toBe(0);
  });

  it("debería asignar revisores 'quizas', si hay menos de 3 interesados", () => {
    users.forEach(user => posterArticle.process_add_to_pending(user));
    posterArticle.process_assign_bid('Interesado', users[0]);
    posterArticle.process_assign_bid('Quizas', users[1]);
    posterArticle.process_assign_bid('Quizas', users[2]);
    posterArticle.process_assign_reviewers();
    expect(posterArticle.count_confirmed_reviewers_article()).toBe(3);
    expect(posterArticle.count_interesteds()).toBe(1);
    expect(posterArticle.count_maybes()).toBe(2);
    expect(posterArticle.count_not_interesteds()).toBe(0);
  });

  it("debería asignar revisores 'No interesado', si hay menos de 3 interesados y quizas", () => {
    users.forEach(user => posterArticle.process_add_to_pending(user));
    posterArticle.process_assign_bid('No interesado', users[0]);
    posterArticle.process_assign_bid('Quizas', users[1]);
    posterArticle.process_assign_bid('Quizas', users[2]);
    posterArticle.process_assign_reviewers();
    expect(posterArticle.count_confirmed_reviewers_article()).toBe(3);
    expect(posterArticle.count_interesteds()).toBe(0);
    expect(posterArticle.count_maybes()).toBe(2);
    expect(posterArticle.count_not_interesteds()).toBe(1);
  });

  it("debería asignar revisores 'No interesado', si hay menos de 3 interesados y quizas", () => {
    users.forEach(user => posterArticle.process_add_to_pending(user));
    posterArticle.process_assign_bid('No interesado', users[0]);
    posterArticle.process_assign_bid('No interesado', users[1]);
    posterArticle.process_assign_bid('Quizas', users[2]);
    posterArticle.process_assign_reviewers();
    expect(posterArticle.count_confirmed_reviewers_article()).toBe(3);
    expect(posterArticle.count_interesteds()).toBe(0);
    expect(posterArticle.count_maybes()).toBe(1);
    expect(posterArticle.count_not_interesteds()).toBe(2);
  });

  it("debería asignar una puntuación valida a un revisor confirmado", () => {
    posterArticle.process_add_to_pending(userFirst);
    posterArticle.process_assign_bid('Interesado', userFirst);
    posterArticle.process_assign_reviewers();
    const reviewerArticle = posterArticle.find_in_confirmed_reviewer(userFirst);
    reviewerArticle.change_true_status_assigned();
    posterArticle.process_score(userFirst, 2, 'Me parece que este articulo es muy bueno...');
    expect(reviewerArticle.score()).toBe(2);
    expect(reviewerArticle.text_review()).toBe('Me parece que este articulo es muy bueno...');
  });

  it("debe mostrar un error si el revisor no está confirmado", () => {
    posterArticle.process_add_to_pending(userFirst);
    posterArticle.process_assign_bid('Interesado', userFirst);
    expect(() => {
      posterArticle.process_score(userFirst, 2, 'Me parece que este articulo es muy bueno...');
    }).toThrow();
  });

});


