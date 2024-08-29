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


jest.mock('./Reception'); 
jest.mock('./Bidding'); 
jest.mock('./Assignment'); 
jest.mock('./Revision'); 
jest.mock('./Selection'); 
jest.mock('./RegularSession'); 
jest.mock('./WorkshopSession'); 
jest.mock('./PosterSession'); 


let mockRegularSession, mockReception, session, mockBidding, mockAssignment, mockRevision, mockSelection, mockArticle, mockReviewer;

beforeEach(async ()=> {

  mockRegularSession = RegularSession();
  // mockWorkshopSession = WorkshopSession();
  // mockPosterSession = PosterSession();

  mockReception = new Reception();
  mockReception.add_article = jest.fn(); 
  session = new Session('AI Conference', mockRegularSession, '2024-12-31');
  session._session_state = mockReception; 

  mockBidding = new Bidding(session);
  mockAssignment = new Assignment(session);
  mockRevision = new Revision(session);
  mockSelection= new Selection(session);

  mockArticle = new Article('Requerimientos no funcionales para App', 'https://refactoring.guru/design-patterns/chain-of-responsibility');
  mockReviewer = new User('Fenandez', 'Cristina', 'UBA', 'fercristina@gmail.com', 'asdasd');

  bestMethod= new BestMethod(session);
  fixedcutMethod= new FixedCutMethod(session);


});

describe("La sesión en estado Reception", () =>{

  it("deberia agregar articulos al estado de la sesión", () => {
    const article = new Article('Este es un articulo', 'Esta es su URL');
    session.receive_article(article, '2024-11-01');
    expect(mockReception.add_article).toHaveBeenCalledWith(article, '2024-11-01');
  });

  it("validamos que el articulo fue agregado correctamente", () => {
    const article = new Article('Este es un articulo', 'Esta es su URL');
    session.add_article_to_list(article);
    expect(session.has_article(article)).toBe(true);
  });

  it("validamos que el articulo no se encuentra en la lista", () => {
    const article = new Article('Este es un articulo', 'Esta es su URL');
    expect(session.has_article(article)).toBe(false);
  });

});

describe("La sesión en estado Bidding", () =>{

  it('mostrar un error al asignar un revisor que ya existe', () => {
    const user = new User('Barboza', 'Emanuel', 'UNLP', 'emabarboza@exa.unsa.edu.ar', 'asdasd');
    user.find_email = jest.fn().mockReturnValue(false);
    session.set_state(mockBidding)
    session.add_reviewer(user);
    expect(() => session.add_reviewer(user)).toThrow();
  });

  it("debe mostrar error si no hay revisores", () => {
    const article = new Article('IA Software', 'https://example.com/article1');
    session.add_article_to_list(article);
    expect(() => {
      session.set_state(mockBidding)
      session.send_articles_randomly();
    }).toThrow();
  });

  it('debe mostrar error si no hay articulos', () => {
    const reviewer = new User('Gimenez', 'Susana', 'UBA', 'gimesusa@gmail.com', 'asdasd');
    session.add_reviewer(reviewer);
    expect(() => {
      session.set_state(mockBidding)
      session.send_articles_randomly();
    }).toThrow();
  });

  it("debe tener al menos 3 revisores", () => {
    const article = new Article('Requerimientos no funcionales para App', 'https://example.com/article1');
    const reviewerFirst = new User('Fenandez', 'Cristina', 'UBA', 'fercristina@gmail.com', 'asdasd');
    const reviewerSecond = new User('Milei', 'Javier', 'UNJu', 'mileijavi@gmail.com', 'asdasd');
    session.add_article_to_list(article);
    session.add_reviewer(reviewerFirst);
    session.add_reviewer(reviewerSecond);
    expect(() => {
      session.set_state(mockBidding)
      session.send_articles_randomly();
    }).toThrow();
  });

  it("debe asignar articulos a revisores aleatoriamente", () => {
    const articleFirst = new Article('Requerimientos no funcionales para App', 'https://refactoring.guru/design-patterns/chain-of-responsibility');
    const articleSecond = new Article('Inteligencia Artificial y Robotica', 'https://refactoring.guru/design-patterns/chain-of-responsibility');
    const articleThird = new Article('Ingenieria de Requerimientos para Sw', 'https://refactoring.guru/design-patterns/chain-of-responsibility');
    const articleFourth = new Article('Metodos Agiles', 'https://refactoring.guru/design-patterns/chain-of-responsibility');
    const reviewerFirst = new User('Fenandez', 'Cristina', 'UBA', 'fercristina@gmail.com', 'asdasd');
    const reviewerSecond = new User('Milei', 'Javier', 'UNJu', 'mileijavi@gmail.com', 'asdasd');
    const reviewerThird = new User('Rial', 'Jorge', 'UNSa', 'rialjorge@gmail.com', 'asdasd');

    session.add_article_to_list(articleFirst);
    session.add_article_to_list(articleSecond);
    session.add_article_to_list(articleThird);
    session.add_article_to_list(articleFourth);
    session.add_reviewer(reviewerFirst);
    session.add_reviewer(reviewerSecond);
    session.add_reviewer(reviewerThird);

    articleFirst.process_add_to_pending = jest.fn();
    articleSecond.process_add_to_pending = jest.fn();
    articleThird.process_add_to_pending = jest.fn();
    articleFourth.process_add_to_pending = jest.fn();
    session.send_articles_randomly();

    expect(articleFirst.process_add_to_pending).toHaveBeenCalled();
    expect(articleSecond.process_add_to_pending).toHaveBeenCalled();
    expect(articleThird.process_add_to_pending).toHaveBeenCalled();
    expect(articleFourth.process_add_to_pending).toHaveBeenCalled();
  });

  it("debe asignar artículos cuando el número de revisores no sea un divisor del total de revisiones.", () => {
    const articleFirst = new Article('Requerimientos no funcionales para App', 'https://refactoring.guru/design-patterns/chain-of-responsibility');
    const articleSecond = new Article('Inteligencia Artificial y Robotica', 'https://refactoring.guru/design-patterns/chain-of-responsibility');  
    const reviewerFirst = new User('Fenandez', 'Cristina', 'UBA', 'fercristina@gmail.com', 'asdasd');
    const reviewerSecond = new User('Milei', 'Javier', 'UNJu', 'mileijavi@gmail.com', 'asdasd');
    const reviewerThird = new User('Rial', 'Jorge', 'UNSa', 'rialjorge@gmail.com', 'asdasd');
    const reviewerFourth = new User('Balli', 'Mariza', 'UNSa', 'ballimariza@gmail.com', 'asdasd');

    session.add_article_to_list(articleFirst);
    session.add_article_to_list(articleSecond);
    session.add_reviewer(reviewerFirst);
    session.add_reviewer(reviewerSecond);
    session.add_reviewer(reviewerThird);
    session.add_reviewer(reviewerFourth);

    articleFirst.process_add_to_pending = jest.fn();
    articleSecond.process_add_to_pending = jest.fn();
    session.send_articles_randomly();
    expect(articleFirst.process_add_to_pending).toHaveBeenCalled();
    expect(articleSecond.process_add_to_pending).toHaveBeenCalled();
  
  });

  it('se debe asignar el bid al articulos si el articulo esta aceptado', () => {
    session.add_article_to_list(mockArticle);
    session.set_state({
      assign_bids: jest.fn()
    });
    session.receive_bids(mockArticle, 'Interesado', mockReviewer);
    expect(session._session_state.assign_bids).toHaveBeenCalledWith(mockArticle, 'Interesado', mockReviewer);
  });

  it("mostrar error si el articulos no fue aceptado en la recepcion, es decir no esta en la lista", () => {
    expect(() => {
      session.receive_bids(mockArticle, 'Interesado', mockReviewer);
    }).toThrow();
  });

  it("se asigna un revisor, si el usuario es revisor de la sesión", () => {
    mockArticle.process_add_to_pending = jest.fn();
    session.add_reviewer(mockReviewer);
    session.assign_reviewer_to_bid(mockArticle, mockReviewer);
    expect(mockArticle.process_add_to_pending).toHaveBeenCalledWith(mockReviewer);
  });

  it("mostrar error si el usuario no es revisor de la sesión", () => {
    mockArticle.process_add_to_pending = jest.fn();
    expect(() => {
      session.assign_reviewer_to_bid(mockArticle, nonReviewer);
    }).toThrow();
  });
});

describe("La sesión en estado Asignación", () =>{
  it('se encarga de asignar revisores para cada articulos', () => {
    const articleFirst = new Article('Requerimientos no funcionales para App', 'https://refactoring.guru/design-patterns/chain-of-responsibility');
    const articleSecond = new Article('Inteligencia Artificial y Robotica', 'https://refactoring.guru/design-patterns/chain-of-responsibility');  
    session.add_article_to_list(articleFirst);
    session.add_article_to_list(articleSecond);
    session.set_state({
      assign_reviewers: jest.fn()
    });
    session.assign_reviewers_to_article();
    expect(session._session_state.assign_reviewers).toHaveBeenCalledWith(articleFirst);
    expect(session._session_state.assign_reviewers).toHaveBeenCalledWith(articleSecond);
    expect(session._session_state.assign_reviewers).toHaveBeenCalledTimes(2);
  });

});

describe("La sesión en estado Revisión", () =>{
  it("mostrar error si no se encuentra el artículo", () => {
    expect(() => {
      session.receive_score(mockArticle, mockReviewer, 2, 'Algunas observaciones que se consideran son...');
    }).toThrow();
  });

  it("pongo 4, y mostrar error si la puntuacion del articulo esta fuera del rango -3 a 3", () => {
    expect(() => {
      session.receive_score(mockArticle, mockReviewer, 4, 'Algunas observaciones que se consideran son...');
    }).toThrow();
  });

  it("pongo -4, y mostrar error si la puntuacion del articulo esta fuera del rango -3 a 3", () => {
    expect(() => {
      session.receive_score(mockArticle, mockReviewer, -4, 'Algunas observaciones que se consideran son...');
    }).toThrow();
  });

  it("mostrar error si el puntaje no es entero", () => {
    expect(() => {
      session.receive_score(mockArticle, mockReviewer, 2.5, 'Algunas observaciones que se consideran son...');
    }).toThrow();
  });

  it("debe asignar una puntuación si se cumplen todas las condiciones", () => {
    session.add_article_to_list(mockArticle);
    session.set_state({
      assign_score: jest.fn()
    });
    session.receive_score(mockArticle, mockReviewer, 3, 'Este articulo esta excelente porque...');
    expect(session._session_state.assign_score).toHaveBeenCalledWith(mockArticle, mockReviewer, 3, 'Este articulo esta excelente porque...');
  });

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

  //});
});