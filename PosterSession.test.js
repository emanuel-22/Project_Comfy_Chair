const PosterSession = require('./PosterSession');

let posterSession;
let articleMock;

beforeEach(() => {
  posterSession = new PosterSession();
  articleMock = {
    get_type: jest.fn(),
    validated_title: jest.fn(),
    validated_count_authors: jest.fn(),
    count_authors: jest.fn(), 
  };
});

describe('Una sesión Poster', () => {
  
  it('deberia aceptar Poster', () => {
    articleMock.get_type.mockReturnValue('Poster');
    articleMock.validated_title.mockReturnValue(true);
    articleMock.count_authors.mockReturnValue(3); 
    articleMock.validated_count_authors.mockReturnValue(true);
    expect(posterSession.is_accepted(articleMock)).toBe(true);
  });

  it('deberia rechazar articulos Regulares', () => {
    articleMock.get_type.mockReturnValue('Regular');  
    expect(posterSession.is_accepted(articleMock)).toBe(false);
  });

  it('deberia rechazar un articulo Poster sin titulo', () => {
    articleMock.get_type.mockReturnValue('Poster');
    articleMock.validated_title.mockReturnValue(false);
    expect(posterSession.is_accepted(articleMock)).toBe(false);
  });

  it('deberia rechazar un artículo Poster sin autores', () => {
    articleMock.get_type.mockReturnValue('Poster');
    articleMock.validated_title.mockReturnValue(true);
    articleMock.count_authors.mockReturnValue(0);
    articleMock.validated_count_authors.mockReturnValue(false);
    expect(posterSession.is_accepted(articleMock)).toBe(false);
  });
  
});
