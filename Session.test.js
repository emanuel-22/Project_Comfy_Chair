const Session = require('./Session');
const Reception = require('./Reception');
const Bidding = require('./Bidding');
const Assignment = require('./Assignment');
const Revision = require('./Revision');
const Selection = require('./Selection');

const RegularSession = require('./RegularSession');
// const WorkshopSession = require('./WorkshopSession');
// const PosterSession = require('./PosterSession');

const User = require('./User'); 
const Article = require('./Article'); 

const BestMethod = require('./BestMethod'); 
const FixedCutMethod = require('./FixedCutMethod'); 
const RegularArticle = require('./RegularArticle');
const Poster = require('./Poster');


jest.mock('./Reception'); 
jest.mock('./Bidding'); 
jest.mock('./Assignment'); 
jest.mock('./Revision'); 
jest.mock('./Selection'); 
jest.mock('./RegularSession'); 
jest.mock('./WorkshopSession'); 
jest.mock('./PosterSession'); 

jest.mock('./RegularArticle'); 
jest.mock('./Poster'); 

let mockRegularSession, mockReception, session, mockBidding, mockAssignment, mockRevision, mockSelection, mockRegularArticle, 
mockPoster, mockReviewer, userFirst, userSecond, userThird, userFourth, userFifth;



beforeEach(async ()=> {

  mockRegularSession = RegularSession();

  mockReception = new Reception();
  mockReception.add_article = jest.fn(); 
  session = new Session('AI Conference', mockRegularSession, '2024-12-31');
  session.set_session_state(mockReception); 

  mockBidding = new Bidding(session);
  mockAssignment = new Assignment(session);
  mockRevision = new Revision(session);
  mockSelection= new Selection(session);

  poster = new Poster('Metodología para el desarrollo de aplicaciones móviles', 'http://www.scielo.org.co/scielo.php?pid=S0123-921X2014000200003&script=sci_arttext');
  regularArticle = new RegularArticle('¿Por qué Fracasan los Proyectos de Software?; Un Enfoque Organizacional', 'https://courses.edx.org/asset-v1:MexicoX+UPEVIPN03x+T32015+type@asset+block/por_que_fallan_los_proy_de_soft.pdf');

  mockReviewer = new User('Fenandez', 'Cristina', 'UBA', 'fercristina@gmail.com', 'asdasd');

  userFirst = new User('Cruz', 'Rosana', 'UNSa', 'cruzrosana@gmail.com', 'asdasd');
  userSecond = new User('Mendez', 'Maria', 'UNLP', 'mariamendez@gmail.com', 'asdasd');
  userThird = new User('Mendez', 'Mariano', 'UNJU', 'marianomendez@gmail.com', 'asdasd');
  userFourth = new User('Rodriguez', 'Maria', 'UNLP', 'mariarodriguez@gmail.com', 'asdasd');
  userFifth = new User('Lopez', 'Rosa', 'UNLP', 'lopezrosa@gmail.com', 'asdasd');

  userSixth = new User('Rodriguez', 'Dalma', 'UNJU', 'dalmarodriguez@gmail.com', 'asdasd');
  bestMethod= new BestMethod(session);
  fixedcutMethod= new FixedCutMethod(session);

});

describe("Cualquier sesión", () =>{

  it("puede tener varios revisores",()=>{
    session.add_reviewer(userFirst); 
    session.add_reviewer(userSecond); 
    expect(session.reviewers()).toContainEqual(userFirst, userSecond);
  });

  it("no puede tener el mismo revisor en la lista de revisores 2 veces",()=>{
    session.add_reviewer(userFirst); 
    session.add_reviewer(userSecond); 
    let duplicated_reviewer = ()=>{session.add_reviewer(userFirst)};
    expect(duplicated_reviewer).toThrow();  
  });

  it("debe tener el número de revisiones = Cant. de articulos * 3",()=>{
    const article = new Article('Requerimientos no funcionales para App', 'https://example.com/article1');
    session.add_article_to_list(article);
    expect(session.count_reviews()).toEqual(3);
  });

});

describe("La sesión en estado Reception", () =>{

  it("deberia agregar articulos al estado de la sesión", () => {
    session.receive_article(regularArticle, userFirst, '2024-11-01');
    expect(mockReception.add_article).toHaveBeenCalledWith(regularArticle, userFirst, '2024-11-01');
  });

  it("validamos que el articulo fue agregado correctamente", () => {
    session.add_article_to_list(regularArticle);
    expect(session.has_article(regularArticle)).toBe(true);
  });

  it("validamos que el articulo no se encuentra en la lista", () => {
    expect(session.has_article(regularArticle)).toBe(false);
  });

});

describe("La sesión en estado Bidding", () =>{

  it('mostrar un error al asignar un revisor que ya existe', () => {
    userFirst.find_email = jest.fn().mockReturnValue(false);
    session.set_session_state(mockBidding)
    session.add_reviewer(userFirst);
    expect(() => session.add_reviewer(userFirst)).toThrow();
  });

  
  it("asigna artículos aleatoriamente a revisores",()=>{
    regularArticle.count_pending_reviewers.mockReturnValue(3); 
    userThird.find_email = jest.fn().mockReturnValue(true);
    userFourth.find_email = jest.fn().mockReturnValue(true);
    userFifth.find_email = jest.fn().mockReturnValue(true);
    session.set_session_state(mockBidding)
    session.add_article_to_list(regularArticle)
    session.add_reviewer(userThird);
    session.add_reviewer(userFourth);
    session.add_reviewer(userFifth); 
    session.send_articles_randomly();
    expect(regularArticle.count_pending_reviewers()).toEqual(3);
  });

});

























// describe("La sesión en estado Bidding", () =>{



  // it("debe mostrar error si no hay revisores", () => {
  //   // session = {
  //   //   count_reviewers: jest.fn(),
      
  //   // };
  //   session.set_state({
  //     count_reviewers: jest.fn(),
  //   });
  //   session.count_reviewers.mockReturnValue(0);
  //   expect(() => {
  //     mockBidding.send_articles_randomly();
  //   }).toThrow("La sesión no tiene revisores");
  // });

  // it('debe mostrar error si no hay articulos', () => {
  //   const reviewer = new User('Gimenez', 'Susana', 'UBA', 'gimesusa@gmail.com', 'asdasd');
  //   session.add_reviewer(reviewer);
  //   expect(() => {
  //     session.set_state(mockBidding)
  //     session.send_articles_randomly();
  //   }).toThrow();
  // });

  // it("debe tener al menos 3 revisores", () => {
  //   const article = new Article('Requerimientos no funcionales para App', 'https://example.com/article1');
  //   const reviewerFirst = new User('Fenandez', 'Cristina', 'UBA', 'fercristina@gmail.com', 'asdasd');
  //   const reviewerSecond = new User('Milei', 'Javier', 'UNJu', 'mileijavi@gmail.com', 'asdasd');
  //   session.add_article_to_list(article);
  //   session.add_reviewer(reviewerFirst);
  //   session.add_reviewer(reviewerSecond);
  //   expect(() => {
  //     session.set_state(mockBidding)
  //     mockBidding.send_articles_randomly();
  //   }).toThrow();
  // });

  // it("debe asignar articulos a revisores aleatoriamente", () => {
  //   const articleFirst = new Article('Requerimientos no funcionales para App', 'https://refactoring.guru/design-patterns/chain-of-responsibility');
  //   const articleSecond = new Article('Inteligencia Artificial y Robotica', 'https://refactoring.guru/design-patterns/chain-of-responsibility');
  //   const articleThird = new Article('Ingenieria de Requerimientos para Sw', 'https://refactoring.guru/design-patterns/chain-of-responsibility');
  //   const articleFourth = new Article('Metodos Agiles', 'https://refactoring.guru/design-patterns/chain-of-responsibility');
  //   const reviewerFirst = new User('Fenandez', 'Cristina', 'UBA', 'fercristina@gmail.com', 'asdasd');
  //   const reviewerSecond = new User('Milei', 'Javier', 'UNJu', 'mileijavi@gmail.com', 'asdasd');
  //   const reviewerThird = new User('Rial', 'Jorge', 'UNSa', 'rialjorge@gmail.com', 'asdasd');

  //   session.add_article_to_list(articleFirst);
  //   session.add_article_to_list(articleSecond);
  //   session.add_article_to_list(articleThird);
  //   session.add_article_to_list(articleFourth);
  //   session.add_reviewer(reviewerFirst);
  //   session.add_reviewer(reviewerSecond);
  //   session.add_reviewer(reviewerThird);

  //   articleFirst.process_add_to_pending = jest.fn();
  //   articleSecond.process_add_to_pending = jest.fn();
  //   articleThird.process_add_to_pending = jest.fn();
  //   articleFourth.process_add_to_pending = jest.fn();

  //   session.set_state(mockBidding);

  //   mockBidding.send_articles_randomly();

  //   expect(articleFirst.process_add_to_pending).toHaveBeenCalled();
  //   expect(articleSecond.process_add_to_pending).toHaveBeenCalled();
  //   expect(articleThird.process_add_to_pending).toHaveBeenCalled();
  //   expect(articleFourth.process_add_to_pending).toHaveBeenCalled();
  // });


  // it("debe asignar artículos cuando el número de revisores no sea un divisor del total de revisiones.", () => {
  //   const articleFirst = new Article('Requerimientos no funcionales para App', 'https://refactoring.guru/design-patterns/chain-of-responsibility');
  //   const articleSecond = new Article('Inteligencia Artificial y Robotica', 'https://refactoring.guru/design-patterns/chain-of-responsibility');  
  //   const reviewerFirst = new User('Fenandez', 'Cristina', 'UBA', 'fercristina@gmail.com', 'asdasd');
  //   const reviewerSecond = new User('Milei', 'Javier', 'UNJu', 'mileijavi@gmail.com', 'asdasd');
  //   const reviewerThird = new User('Rial', 'Jorge', 'UNSa', 'rialjorge@gmail.com', 'asdasd');
  //   const reviewerFourth = new User('Balli', 'Mariza', 'UNSa', 'ballimariza@gmail.com', 'asdasd');

  //   session.add_article_to_list(articleFirst);
  //   session.add_article_to_list(articleSecond);
  //   session.add_reviewer(reviewerFirst);
  //   session.add_reviewer(reviewerSecond);
  //   session.add_reviewer(reviewerThird);
  //   session.add_reviewer(reviewerFourth);

  //   articleFirst.process_add_to_pending = jest.fn();
  //   articleSecond.process_add_to_pending = jest.fn();
  //   session._session_state = mockBidding; 

  //   mockBidding.send_articles_randomly();
  //   expect(articleFirst.process_add_to_pending).toHaveBeenCalled();
  //   expect(articleSecond.process_add_to_pending).toHaveBeenCalled();
  
  // });

//   it('se debe asignar el bid al articulos si el articulo esta aceptado', () => {
//     session.add_article_to_list(mockArticle);
//     session.set_session_state({
//       assign_bids: jest.fn()
//     });
//     session.receive_bids(mockArticle, 'Interesado', mockReviewer);
//     expect(session._session_state.assign_bids).toHaveBeenCalledWith(mockArticle, 'Interesado', mockReviewer);
//   });

 
//   it("se asigna un revisor, si el usuario es revisor de la sesión", () => {
//     mockArticle.process_add_to_pending = jest.fn();
//     session.add_reviewer(mockReviewer);
//     session.assign_reviewer_to_bid(mockArticle, mockReviewer);
//     expect(mockArticle.process_add_to_pending).toHaveBeenCalledWith(mockReviewer);
//   });

//   it("mostrar error si el usuario no es revisor de la sesión", () => {
//     mockArticle.process_add_to_pending = jest.fn();
//     expect(() => {
//       session.assign_reviewer_to_bid(mockArticle, nonReviewer);
//     }).toThrow();
//   });
// });

// describe("La sesión en estado Asignación", () =>{
//   it('se encarga de asignar revisores para cada articulos', () => {
//     const articleFirst = new Article('Requerimientos no funcionales para App', 'https://refactoring.guru/design-patterns/chain-of-responsibility');
//     const articleSecond = new Article('Inteligencia Artificial y Robotica', 'https://refactoring.guru/design-patterns/chain-of-responsibility');  
//     session.add_article_to_list(articleFirst);
//     session.add_article_to_list(articleSecond);
//     session.set_session_state({
//       assign_reviewers_to_article: jest.fn()
//     });
//     session.assign_reviewers_to_article();
//     expect(session._session_state.assign_reviewers_to_article).toHaveBeenCalledWith();
    
//   });

// });

// describe("La sesión en estado Revisión", () =>{
//   it("mostrar error si no se encuentra el artículo", () => {
//     expect(() => {
//       session.receive_score(mockArticle, mockReviewer, 2, 'Algunas observaciones que se consideran son...');
//     }).toThrow();
//   });

//   it("pongo 4, y mostrar error si la puntuacion del articulo esta fuera del rango -3 a 3", () => {
//     expect(() => {
//       session.receive_score(mockArticle, mockReviewer, 4, 'Algunas observaciones que se consideran son...');
//     }).toThrow();
//   });

//   it("pongo -4, y mostrar error si la puntuacion del articulo esta fuera del rango -3 a 3", () => {
//     expect(() => {
//       session.receive_score(mockArticle, mockReviewer, -4, 'Algunas observaciones que se consideran son...');
//     }).toThrow();
//   });

//   it("mostrar error si el puntaje no es entero", () => {
//     expect(() => {
//       session.receive_score(mockArticle, mockReviewer, 2.5, 'Algunas observaciones que se consideran son...');
//     }).toThrow();
//   });

//   it("debe asignar una puntuación si se cumplen todas las condiciones", () => {
//     session.add_article_to_list(mockArticle);
//     session.set_session_state({
//       assign_score: jest.fn()
//     });
//     session.receive_score(mockArticle, mockReviewer, 3, 'Este articulo esta excelente porque...');
//     expect(session._session_state.assign_score).toHaveBeenCalledWith(mockArticle, mockReviewer, 3, 'Este articulo esta excelente porque...');
//   });

  // it("Debería seleccionar artículos correctamente cuando numero maximo a aceptar es mayor que 0", () => {
    
  //   const articleFirst = new Article('Requerimientos no funcionales para App', 'https://refactoring.guru/design-patterns/chain-of-responsibility');
  //   const articleSecond = new Article('Inteligencia Artificial y Robotica', 'https://refactoring.guru/design-patterns/chain-of-responsibility');  
  //   const articleThird = new Article('Ingenieria de Requerimientos para Sw', 'https://refactoring.guru/design-patterns/chain-of-responsibility');
  //   const articleFourth = new Article('Metodos Agiles', 'https://refactoring.guru/design-patterns/chain-of-responsibility');
    // session._selection_method = fixedcutMethod;
    // fixedcutMethod.select([articleFirst, articleSecond, articleThird, articleFourth ]);
    // //fixedcutMethod.select = jest.fn();
     
    // session.define_num_max_accepted(3)
    // session.start_articles_select();
    // expect(fixedcutMethod.select).toHaveBeenCalledWith(session._articles);
    // expect(session._selected_articles).toEqual([
    //   articleFirst, articleFirst, articleThird
    // ]);

  //});});