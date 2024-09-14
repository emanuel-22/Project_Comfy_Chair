const Assignment = require('./Assignment');
const Revision = require('./Revision');
const User = require('./User');
const Session = require('./Session');
const Article = require('./Article');


let sessionMock;
let assignment;
let articleMock, articleMock2;

jest.mock('./Session');
jest.mock('./Article');
jest.mock('./User');


beforeEach( ()=> {

  articleMock = new Article('IT Project Failures, Causes and Cures', 'https://refactoring.guru/design-patterns/state');
  articleMock2 = new Article('IT Project Failures, Causes and Cures', 'https://refactoring.guru/design-patterns/state');
  sessionMock = new Session('Agentes y Sistemas Inteligentes', {}, '2025-05-02'); 
  assignment = new Assignment(sessionMock, '2024-12-31');
  userMock = new User('Benavidez', 'Lucho', 'UNJu', 'pbarranco@gmail.com', 'asdasd');
  sessionMock._articles = [articleMock, articleMock2];

});

describe("En la etapa de Asignación", ()=>{

  it('se verifica que la sesion se encuentra en estado Asignacion', () => {
    expect(assignment.name_state()).toBe('Asignacion');
  });

  it('la session pasa a estado Revisión', () => {
    assignment.proceed();
    expect(sessionMock.set_session_state).toHaveBeenCalledWith(expect.any(Revision));
  });

  it('no se aceptan más artículos', () => {
    expect(() => assignment.add_article(articleMock, userMock, '2025-05-02')).toThrow();
  });

  it('se inicia el proceso de asignacion de revisores a cada artículo', () => {
    assignment.assign_reviewers_to_article();
    expect(articleMock.process_assign_reviewers).toHaveBeenCalled();
    expect(articleMock2.process_assign_reviewers).toHaveBeenCalled();
  });

});