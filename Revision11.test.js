const Poster = require('./Poster');
const PosterSession = require('./PosterSession');
const Session = require('./Session');
const User = require('./User');

beforeEach(async ()=> {
  timestamp = Date.now();
  date = new Date(timestamp);
  deadline = date.toISOString().split('T')[0];

  dateOther = new Date('2024-07-27');
  shippingDate = dateOther.toISOString().split('T')[0]; //2024-07-27

  userFirst = new User('Cruz', 'Rosana', 'UNSa', 'cruzrosana@gmail.com', 'asdasd');
  userSecond = new User('Galvan', 'Lucas', 'UBA', 'lucasg@gmail.com', 'asdasd');
  userThird = new User('Mamani', 'Rosana', 'UNSa', 'mamanirosi@gmail.com', 'asdasd');

  posterSessionType = new Session('Agentes y Sistemas Inteligentes', new PosterSession(), deadline);
  posterSessionType.proceed(); // Nos movemos de Recepción a Bidding
  posterSessionType.proceed(); // Nos movemos de Bidding a Asignacion
  posterSessionType.proceed(); // Nos movemos de Asignacion a Revision

  posterArticle = new Poster(
    'Implementacion de metodologia agil a organizaciones no gubernamentales', 
    'https://refactoring.guru/design-patterns/state',
    'https://developero.io/blog/jest-mock-module-function-class-promises-axios-y-mas'
  );
});

describe("En la etapa de Revisión, las sesiones", () =>{

  // it('deberia proceder de Recepcion a Bidding, de Bidding a Asignación y de Asignacion a Revisión de forma correcta', () => {
  //   expect(posterSessionType.session_state().name()).toBe('Revision');
  // });

  it("no se aceptan mas articulos",()=>{
    let invalideted = ()=>{posterSessionType.receive_article(posterArticle, userFirst, shippingDate)};
    expect(invalideted).toThrow();
  });

  // it("El puntaje debe ser entre -3 a 3, inclusive el 0",()=>{
  //   posterSessionType.add_article_to_list(posterArticle)
  //   posterSessionType.add_reviewer(userFirst); 
  //   posterSessionType.add_reviewer(userSecond); 
  //   posterSessionType.add_reviewer(userThird); 
  //   posterArticle.process_assign_bid('Interesado', userFirst);
  //   posterArticle.process_assign_bid('Interesado', userSecond);
  //   posterArticle.process_assign_bid('Interesado', userThird);
  //   posterArticle.process_assign_reviewers();
  //   posterSessionType.receive_score(posterArticle, userFirst, 1 , 'Algunas consideraciones son...')
  //   posterSessionType.receive_score(posterArticle, userSecond, 3, 'Algunas observaciones son...')
  //   posterSessionType.receive_score(posterArticle, userThird, -2, 'Para tener en cuenta se podria...')
  //   expect(posterArticle.confirmed_score_reviewers()).toContainEqual(1, 3, -2);
  //   expect(posterArticle.confirmed_text_review_reviewers()).toContainEqual(
  //     'Algunas consideraciones son...', 'Algunas observaciones son...','Para tener en cuenta se podria...'
  //   );
  // });

  // it("El puntaje debe estar entre -3 a 3, otro numero se rechaza",()=>{
  //   posterSessionType.add_article_to_list(posterArticle)
  //   posterSessionType.add_reviewer(userFirst); 
  //   posterSessionType.add_reviewer(userSecond); 
  //   posterSessionType.add_reviewer(userThird); 
  //   posterArticle.process_assign_bid('Interesado', userFirst);
  //   posterArticle.process_assign_bid('Interesado', userSecond);
  //   posterArticle.process_assign_bid('Interesado', userThird);
  //   posterArticle.process_assign_reviewers();
  //   posterSessionType.receive_score(posterArticle, userFirst, 1 , 'Algunas consideraciones son...')
  //   posterSessionType.receive_score(posterArticle, userSecond, 3, 'Algunas observaciones son...')
  //   let invalidet_article = ()=>{posterSessionType.receive_score(posterArticle, userThird, 4, 'Para tener en cuenta se podria...')};
  //   expect(invalidet_article).toThrow();
  // });

  // it("El puntaje debe ser número entero entre -3 a 3",()=>{
  //   posterSessionType.add_article_to_list(posterArticle)
  //   posterSessionType.add_reviewer(userFirst); 
  //   posterSessionType.add_reviewer(userSecond); 
  //   posterSessionType.add_reviewer(userThird); 
  //   posterArticle.process_assign_bid('Interesado', userFirst);
  //   posterArticle.process_assign_bid('Interesado', userSecond);
  //   posterArticle.process_assign_bid('Interesado', userThird);
  //   posterArticle.process_assign_reviewers();
  //   posterSessionType.receive_score(posterArticle, userFirst, 1 , 'Algunas consideraciones son...')
  //   posterSessionType.receive_score(posterArticle, userSecond, 3, 'Algunas observaciones son...')
  //   let invalidet_article = ()=>{posterSessionType.receive_score(posterArticle, userThird, 2.5, 'Para tener en cuenta se podria...')};
  //   expect(invalidet_article).toThrow();
  // });

  // it("El puntaje debe incluir -3",()=>{
  //   posterSessionType.add_article_to_list(posterArticle)
  //   posterSessionType.add_reviewer(userFirst); 
  //   posterSessionType.add_reviewer(userSecond); 
  //   posterSessionType.add_reviewer(userThird); 
  //   posterArticle.process_assign_bid('Interesado', userFirst);
  //   posterArticle.process_assign_bid('Interesado', userSecond);
  //   posterArticle.process_assign_bid('Interesado', userThird);
  //   posterArticle.process_assign_reviewers();
  //   posterSessionType.receive_score(posterArticle, userFirst, 1 , 'Algunas consideraciones son...');
  //   posterSessionType.receive_score(posterArticle, userSecond, -3, 'Algunas observaciones son...');
  //   posterSessionType.receive_score(posterArticle, userSecond, -3, 'Para tener en cuenta se podria...')
  //   expect(posterArticle.confirmed_score_reviewers()).toContainEqual(1, -3, -3);
  // });

  // it("El puntaje debe incluir 3",()=>{
  //   posterSessionType.add_article_to_list(posterArticle)
  //   posterSessionType.add_reviewer(userFirst); 
  //   posterSessionType.add_reviewer(userSecond); 
  //   posterSessionType.add_reviewer(userThird); 
  //   posterArticle.process_assign_bid('Interesado', userFirst);
  //   posterArticle.process_assign_bid('Interesado', userSecond);
  //   posterArticle.process_assign_bid('Interesado', userThird);
  //   posterArticle.process_assign_reviewers();
  //   posterSessionType.receive_score(posterArticle, userFirst, 1 , 'Algunas consideraciones son...');
  //   posterSessionType.receive_score(posterArticle, userSecond, 3, 'Algunas observaciones son...');
  //   posterSessionType.receive_score(posterArticle, userSecond, 3, 'Para tener en cuenta se podria...')
  //   expect(posterArticle.confirmed_score_reviewers()).toContainEqual(1, 3, 3);
  // });

  // it("El puntaje debe incluir 0",()=>{
  //   posterSessionType.add_article_to_list(posterArticle)
  //   posterSessionType.add_reviewer(userFirst); 
  //   posterSessionType.add_reviewer(userSecond); 
  //   posterSessionType.add_reviewer(userThird); 
  //   posterArticle.process_assign_bid('Interesado', userFirst);
  //   posterArticle.process_assign_bid('Interesado', userSecond);
  //   posterArticle.process_assign_bid('Interesado', userThird);
  //   posterArticle.process_assign_reviewers();
  //   posterSessionType.receive_score(posterArticle, userFirst, 0 , 'Algunas consideraciones son...');
  //   posterSessionType.receive_score(posterArticle, userSecond, -3, 'Algunas observaciones son...');
  //   posterSessionType.receive_score(posterArticle, userSecond, 3, 'Para tener en cuenta se podria...')
  //   expect(posterArticle.confirmed_score_reviewers()).toContainEqual(0, -3, 3);
  // });

  // it("El ariculo debe haber sido aceptado en Recepción y debe haber sido incluido en la sesión",()=>{
  //   posterSessionType.add_reviewer(userFirst); 
  //   posterSessionType.add_reviewer(userSecond); 
  //   posterSessionType.add_reviewer(userThird); 
  //   posterArticle.process_assign_bid('Interesado', userFirst);
  //   posterArticle.process_assign_bid('Interesado', userSecond);
  //   posterArticle.process_assign_bid('Interesado', userThird);
  //   posterArticle.process_assign_reviewers();
  //   let invalidet_article = ()=>{posterSessionType.receive_score(posterArticle, userThird, 1, 'Para tener en cuenta se podria...')};
  //   expect(invalidet_article).toThrow();
  // });

})
  