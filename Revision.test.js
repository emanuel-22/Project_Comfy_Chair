const Revision = require('./Revision');
const Selection = require('./Selection');
const Session = require('./Session');
const Article = require('./Article');
const User = require('./User');

let sessionMock;
let articleMock;
let revision;

jest.mock('./Session');
jest.mock('./Article');
jest.mock('./User');

beforeEach( ()=> {

  articleMock = new Article('IT Project Failures, Causes and Cures', 'https://refactoring.guru/design-patterns/state');
  sessionMock = new Session('Agentes y Sistemas Inteligentes', {}, '2025-05-02'); 
  revision = new Revision(sessionMock, '2024-12-31');
  userMock = new User('Barranco', 'Pablo', 'UNJu', 'pbarranco@gmail.com', 'asdasd');

});

describe("En la etapa de revisión", ()=>{

  it('verificamos que la sesion se encuentra en estado Revision', () => {
    expect(revision.name_state()).toBe('Revision');
  });

  it('la sesion pasa a estado Selección', () => {
    revision.proceed();
    expect(sessionMock.set_session_state).toHaveBeenCalledWith(expect.any(Selection));
  });

  it('no se aceptan más artículos', () => {
    expect(() => revision.add_article(articleMock ,userMock, '2025-05-02')).toThrow();
  });

  it('se asigna una puntuación al artículo', () => {
    const score = 5;
    const textReview = 'Este es un gran articulo porque...';
    revision.assign_score(articleMock, userMock, score, textReview);
    expect(articleMock.process_score).toHaveBeenCalledWith(userMock, score, textReview);
  });

});