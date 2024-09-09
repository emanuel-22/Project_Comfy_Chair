const Reception = require('./Reception');
const Bidding = require('./Bidding');

let sessionMock;
let reception;
let articleMock;
let notificationAuthorMock;


beforeEach( ()=> {
  sessionMock = {
    is_accepted: jest.fn(),
    add_article_to_list: jest.fn(),
    set_session_state: jest.fn(),
  };

  reception = new Reception(sessionMock, '2024-12-31');

  articleMock = {
    set_notification_author: jest.fn(),
    notification_author: jest.fn().mockReturnValue({
      receive_notification: jest.fn(),
    }),
  };

  notificationAuthorMock = {
    receive_notification: jest.fn(),
  };

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
    sessionMock.is_accepted.mockReturnValue(true); 
    reception.validated_dates = jest.fn().mockReturnValue(true); 
    reception.add_article(articleMock, notificationAuthorMock, '2024-11-03');
    expect(sessionMock.is_accepted).toHaveBeenCalledWith(articleMock);
    expect(sessionMock.add_article_to_list).toHaveBeenCalledWith(articleMock);
    expect(articleMock.set_notification_author).toHaveBeenCalledWith(notificationAuthorMock);
    expect(articleMock.notification_author().receive_notification).toHaveBeenCalledWith('Recepción');
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



