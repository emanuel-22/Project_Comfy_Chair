const WorkshopSession = require('./WorkshopSession');

let workshopSession;
let articleMock;

beforeEach(() => {
  workshopSession = new WorkshopSession();
  articleMock = {
      get_type: jest.fn(),
      validated_abstract: jest.fn(),
      validated_title: jest.fn(),
      validated_count_authors: jest.fn(),
      count_authors: jest.fn(), 
  };
});

describe('Una sesión Workshop', () => {
  
  it('deberia aceptar articulos de tipo Regular', () => {
    articleMock.get_type.mockReturnValue('Regular');
    articleMock.validated_abstract.mockReturnValue(true);
    articleMock.validated_title.mockReturnValue(true);
    articleMock.count_authors.mockReturnValue(3); 
    articleMock.validated_count_authors.mockReturnValue(true);
    expect(workshopSession.is_accepted(articleMock)).toBe(true);
  });

  it('deberia rechazar un articulo regular con abstract largo (mas de 300 palabras)', () => {
    articleMock.get_type.mockReturnValue('Regular');
    articleMock.validated_title.mockReturnValue(true);
    articleMock.count_authors.mockReturnValue(3); 
    articleMock.validated_count_authors.mockReturnValue(true);
    articleMock.validated_abstract.mockReturnValue(false);
    expect(workshopSession.is_accepted(articleMock)).toBe(false);
  });

  it('deberia rechazar un articulo regular sin titulo', () => {
    articleMock.get_type.mockReturnValue('Regular');
    articleMock.validated_abstract.mockReturnValue(true);
    articleMock.validated_title.mockReturnValue(false);
    articleMock.count_authors.mockReturnValue(3);
    articleMock.validated_count_authors.mockReturnValue(true);
    expect(workshopSession.is_accepted(articleMock)).toBe(false);
  });

  it('deberia rechazar un articulo regular sin autores', () => {
    articleMock.get_type.mockReturnValue('Regular');
    articleMock.validated_abstract.mockReturnValue(true);
    articleMock.validated_title.mockReturnValue(true);
    articleMock.count_authors.mockReturnValue(0);
    articleMock.validated_count_authors.mockReturnValue(false);
    expect(workshopSession.is_accepted(articleMock)).toBe(false);
  });

  it('deberia aceptar artículos de tipo Poster', () => {
    articleMock.get_type.mockReturnValue('Poster');
    articleMock.validated_title.mockReturnValue(true);
    articleMock.count_authors.mockReturnValue(3); 
    articleMock.validated_count_authors.mockReturnValue(true);
    expect(workshopSession.is_accepted(articleMock)).toBe(true);
  });

  it('deberia rechazar un articulo poster sin titulo', () => {
    articleMock.get_type.mockReturnValue('Poster');
    articleMock.validated_title.mockReturnValue(false);
    articleMock.count_authors.mockReturnValue(3);
    articleMock.validated_count_authors.mockReturnValue(true);
    expect(workshopSession.is_accepted(articleMock)).toBe(false);
  });

  it('deberia rechazar un artículo poster sin autores', () => {
    articleMock.get_type.mockReturnValue('Poster');
    articleMock.validated_title.mockReturnValue(true);
    articleMock.count_authors.mockReturnValue(0);
    articleMock.validated_count_authors.mockReturnValue(false);
    expect(workshopSession.is_accepted(articleMock)).toBe(false);
  });

});
