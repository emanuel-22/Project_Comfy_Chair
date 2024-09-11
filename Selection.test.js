const Selection = require('./Selection');
const Session = require('./Session');
const Article = require('./Article');
const User = require('./User');

let sessionMock;
let articleMock;
let selection;

jest.mock('./Session');
jest.mock('./Article');
jest.mock('./User');

beforeEach( ()=> {

  articleMock = new Article('IT Project Failures, Causes and Cures', 'https://refactoring.guru/design-patterns/state');
  sessionMock = new Session('Agentes y Sistemas Inteligentes', {}, '2025-05-02'); 
  selection = new Selection(sessionMock, '2024-12-31');
  userMock = new User('Barranco', 'Pablo', 'UNJu', 'pbarranco@gmail.com', 'asdasd');

});

describe("En la etapa de Selección", () => {

  it('verificamos que la sesión se encuentra en estado Selección', () => {
    expect(selection.name_state()).toBe('Seleccion');
  });

  it('no se aceptan más artículos durante la selección', () => {
    expect(() => selection.add_article(articleMock, userMock, '2025-05-02')).toThrow();
  });

  it('se inicia el proceso de selección de artículos', () => {
    selection.start_articles_select();
    expect(sessionMock.start_articles_select).toHaveBeenCalled();
  });

});