const Reception = require('./Reception');
const Bidding = require('./Bidding');
const Session = require('./Session');
const Article = require('./Article');

let sessionMock;
let reception;
let articleMock;
let notificationAuthorMock;

jest.mock('./Session');
jest.mock('./Article');
jest.mock('./User');


beforeEach( ()=> {
  articleMock = new Article('IT Project Failures, Causes and Cures', 'https://refactoring.guru/design-patterns/state');
  sessionMock = new Session('Agentes y Sistemas Inteligentes', {}, '2025-05-02'); 
  reception = new Reception(sessionMock, '2024-12-31');
});

describe("En la etapa de recepción", ()=>{

  it('verificamos que la sesion se encuentra en estado Recepción', () => {
    expect(reception.name_state()).toBe('Recepción');
  });

  it('la session pasa a estado Bidding', () => {
    reception.proceed();
    expect(sessionMock.set_session_state).toHaveBeenCalledWith(expect.any(Bidding));
  });

  it('la fecha de envío de un articulo debe ser menor a la fecha de recepción', () => {
    const validDate = '2024-11-25';
    const invalidDate = '2025-02-01';
    expect(reception.validated_dates(validDate)).toBe(true);
    expect(reception.validated_dates(invalidDate)).toBe(false);
  });

  it('el artículo es aceptado y la fecha de envio es valida', () => {
    articleMock.notification_author.mockReturnValue({receive_notification: jest.fn()})
    sessionMock.is_accepted.mockReturnValue(true); 
    reception.validated_dates = jest.fn().mockReturnValue(true); 
    reception.add_article(articleMock, notificationAuthorMock, '2024-11-03');
    expect(sessionMock.is_accepted).toHaveBeenCalledWith(articleMock);
    expect(sessionMock.add_article_to_list).toHaveBeenCalledWith(articleMock);
    expect(articleMock.set_notification_author).toHaveBeenCalledWith(notificationAuthorMock);
  });

  it('el artículo es rechazado y la fecha de envio es valida', () => {
    sessionMock.is_accepted.mockReturnValue(false);  
    reception.validated_dates = jest.fn().mockReturnValue(true); 
    expect(() => {
      reception.add_article(articleMock, notificationAuthorMock, '2024-11-03');
    }).toThrow();
  });

  it('el articulo es aceptado y la fecha de envio es invalida', () => {
    sessionMock.is_accepted.mockReturnValue(true); 
    reception.validated_dates = jest.fn().mockReturnValue(false);  
    expect(() => {
      reception.add_article(articleMock, notificationAuthorMock, '2025-05-02');
    }).toThrow();
  });

  it('el artículo es rechazado y la fecha de envio es invalida', () => {
    sessionMock.is_accepted.mockReturnValue(false);  
    reception.validated_dates = jest.fn().mockReturnValue(false); 
    expect(() => {
      reception.add_article(articleMock, notificationAuthorMock, '2025-05-02');
    }).toThrow();
  });

});



