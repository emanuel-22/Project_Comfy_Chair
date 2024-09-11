const Bidding = require('./Bidding');
const Assignment = require('./Assignment');
const User = require('./User');
const Session = require('./Session');
const Article = require('./Article');


let sessionMock;
let bidding;
let articleMock;

jest.mock('./Session');
jest.mock('./Article');

beforeEach( ()=> {
  articleMock = new Article('IT Project Failures, Causes and Cures', 'https://refactoring.guru/design-patterns/state');
  sessionMock = new Session('Agentes y Sistemas Inteligentes', {}, '2025-05-02'); 
  bidding = new Bidding(sessionMock, '2024-12-31');
  userMock = new User('Cruz', 'Rosana', 'UNSa', 'cruzrosana@gmail.com', 'asdasd');

});

describe("En la etapa de Bidding", ()=>{

  it('verificamos que la sesion se encuentra en estado Bidding', () => {
    expect(bidding.name_state()).toBe('Bidding');
  });

  it('la session pasa a estado Asignación', () => {
    bidding.proceed();
    expect(sessionMock.set_session_state).toHaveBeenCalledWith(expect.any(Assignment));
  });

  it('no se aceptan más artículos', () => {
    expect(() => bidding.add_article({}, {}, '2025-05-02')).toThrow();
  });

  it('debe tener revisores en la sesión', () => {
    sessionMock.count_reviewers.mockReturnValue(0); 
    sessionMock.count_articles.mockReturnValue(5); 
    expect(() => bidding.send_articles_randomly()).toThrow();
  });

  it('debe tener artículos en la sesión', () => {
    sessionMock.count_reviewers.mockReturnValue(5); 
    sessionMock.count_articles.mockReturnValue(0); 
    expect(() => bidding.send_articles_randomly()).toThrow();
  });

  it('debe tener al menos 3 revisores para asignar artículos aleatoriamente a revisores', () => {
    sessionMock.count_reviewers.mockReturnValue(2); 
    sessionMock.count_articles.mockReturnValue(5); 
    expect(() => bidding.send_articles_randomly()).toThrow();
  });

  it('debe asignar un bid correctamente a un artículo', () => {
    sessionMock.find_article.mockReturnValue(true); 
    bidding.assign_bids(articleMock, 'Interesado', userMock);
    expect(articleMock.process_assign_bid).toHaveBeenCalledWith('Interesado', userMock);
  });

  it('mostrar error si el articulo no se encuentra en la sesión', () => {
    sessionMock.find_article.mockReturnValue(false); 
    expect(() => bidding.assign_bids({}, 'Interesado', userMock)).toThrow();
  });

});