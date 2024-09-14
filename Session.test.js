const Session = require('./Session');
const Reception = require('./Reception');
const Bidding = require('./Bidding');
const Assignment = require('./Assignment');
const Revision = require('./Revision');
const Selection = require('./Selection');
const RegularSession = require('./RegularSession');
const WorkshopSession = require('./WorkshopSession');
const PosterSession = require('./PosterSession');
const User = require('./User'); 
const RegularArticle = require('./RegularArticle');
const Poster = require('./Poster'); 
const BestMethod = require('./BestMethod'); 
const FixedCutMethod = require('./FixedCutMethod'); 

jest.mock('./Reception'); 
jest.mock('./Bidding'); 
jest.mock('./Assignment'); 
jest.mock('./Revision'); 
jest.mock('./Selection'); 
jest.mock('./RegularSession'); 
jest.mock('./PosterSession'); 
jest.mock('./WorkshopSession'); 
jest.mock('./RegularArticle'); 
jest.mock('./Poster'); 
jest.mock('./User'); 

let mockReception, mockBidding, mockAssignment, mockRevision, mockSelection; // estados
let mockRegularTypeSession, mockPosterTypeSession, mockWorkshopTypeSession; // tipos
let sessionRegularMock, sessionPosterMock, sessionWorkshopMock;
let mockRegularArticle, mockRegularArticle2, mockRegularArticle3,mockRegularArticle4, mockPosterArticle; // tipos de articulos
let mockUserFirst, mockUserSecond, mockUserThird;

beforeEach(()=> {

  mockRegularTypeSession = new RegularSession();
  mockPosterTypeSession = new PosterSession();
  mockWorkshopTypeSession = new WorkshopSession();

  sessionRegularMock = new Session('AI Conference', mockRegularTypeSession, '2024-12-31');
  sessionPosterMock = new Session('AI Conference', mockPosterTypeSession, '2024-12-31');
  sessionWorkshopMock = new Session('AI Conference', mockWorkshopTypeSession, '2024-12-31');

  mockReception = new Reception(sessionRegularMock, '2024-12-31');
  mockBidding = new Bidding(sessionRegularMock);
  mockAssignment = new Assignment(sessionRegularMock);
  mockRevision = new Revision(sessionRegularMock);
  mockSelection= new Selection(sessionRegularMock);

  mockPosterArticle = new Poster('Metodología para el desarrollo de aplicaciones móviles', 'http://www.scielo.org.co/scielo.php?pid=S0123-921X2014000200003&script=sci_arttext');
  mockRegularArticle = new RegularArticle('¿Por qué Fracasan los Proyectos de Software?; Un Enfoque Organizacional', 'https://courses.edx.org/asset-v1:MexicoX+UPEVIPN03x+T32015+type@asset+block/por_que_fallan_los_proy_de_soft.pdf');
  mockRegularArticle2 = new RegularArticle('Uso de los dispositivos móviles en educación infantil', 'https://helvia.uco.es/bitstream/handle/10396/14212/Edmetic_vol_5_n_2_10.pdf?sequence=');
  mockRegularArticle3 = new RegularArticle('Dispositivos móviles', 'https://d1wqtxts1xzle7.cloudfront.net/34258261/dispostivos_moviles_y_su_clasificacion-libre.pdf');
  mockRegularArticle4 = new RegularArticle('Hola Mundo', 'https://d1postivos_moviles_y_su_clasificacion-libre.pdf');

  mockUserFirst = new User('Cruz', 'Rosana', 'UNSa', 'cruzrosana@gmail.com', 'asdasd');
  mockUserSecond = new User('Mendez', 'Maria', 'UNLP', 'mariamendez@gmail.com', 'asdasd');
  mockUserThird = new User('Lopez', 'Rosana', 'UNJU', 'lopezrosana@gmail.com', 'asdasd');

  mockUserFirst.email.mockReturnValue('cruzrosana@gmail.com');
  mockUserSecond.email.mockReturnValue('mariamendez@gmail.com');
  mockUserThird.email.mockReturnValue('lopezrosana@gmail.com');

});

describe("Cualquier sesión", () =>{

  it("puede tener varios revisores sin duplicados", () => {
    sessionRegularMock.add_reviewer(mockUserFirst);
    sessionRegularMock.add_reviewer(mockUserSecond);
    sessionRegularMock.add_reviewer(mockUserThird);

    expect(sessionRegularMock.count_reviewers()).toBe(3);
    expect(sessionRegularMock.reviewers()).toContain(mockUserFirst);
    expect(sessionRegularMock.reviewers()).toContain(mockUserSecond);
    expect(sessionRegularMock.reviewers()).toContain(mockUserThird);
  });

  it("no permite agregar el mismo revisor 2 veces", () => {
    sessionRegularMock.add_reviewer(mockUserFirst);
    expect(sessionRegularMock.count_reviewers()).toBe(1);
    expect(() => sessionRegularMock.add_reviewer(mockUserFirst)).toThrow('Este usuario ya es revisor de esta Sesion');
  });

  it("debe tener el número de revisiones = Cant. de articulos * 3",()=>{
    sessionRegularMock.add_article_to_list(mockRegularArticle);
    expect(sessionRegularMock.count_reviews()).toEqual(3);
  });

});

describe("La sesión en estado Reception", () =>{

  it("un articulo puede ser aceptado por Sesion Regular", () => {
    mockRegularTypeSession.is_accepted.mockReturnValue(true);
    let result = sessionRegularMock.is_accepted(mockRegularArticle);
    expect(mockRegularTypeSession.is_accepted).toHaveBeenCalledWith(mockRegularArticle);
    expect(result).toBe(true);
  });

  it("un articulo puede ser rechazado por Sesion Regular", () => {
    mockRegularTypeSession.is_accepted.mockReturnValue(false);
    let result = sessionRegularMock.is_accepted(mockRegularArticle);
    expect(mockRegularTypeSession.is_accepted).toHaveBeenCalledWith(mockRegularArticle);
    expect(result).toBe(false);
  });

  it("un articulo puede ser aceptado por Sesion Poster", () => {
    mockPosterTypeSession.is_accepted.mockReturnValue(true);
    let result = sessionPosterMock.is_accepted(mockPosterArticle);
    expect(mockPosterTypeSession.is_accepted).toHaveBeenCalledWith(mockPosterArticle);
    expect(result).toBe(true);
  });

  it("un articulo puede ser rechazado por Sesion Poster", () => {
    mockPosterTypeSession.is_accepted.mockReturnValue(false);
    let result = sessionPosterMock.is_accepted(mockPosterArticle);
    expect(mockPosterTypeSession.is_accepted).toHaveBeenCalledWith(mockPosterArticle);
    expect(result).toBe(false);
  });

  it("un articulo puede ser aceptado por Sesion Workshop", () => {
    mockWorkshopTypeSession.is_accepted.mockReturnValue(true);
    let result = sessionWorkshopMock.is_accepted(mockPosterArticle);
    expect(mockWorkshopTypeSession.is_accepted).toHaveBeenCalledWith(mockPosterArticle);
    expect(result).toBe(true);
  });

  it("un articulo puede ser rechazado por Sesion Workshop", () => {
    mockWorkshopTypeSession.is_accepted.mockReturnValue(false);
    let result = sessionWorkshopMock.is_accepted(mockPosterArticle);
    expect(mockWorkshopTypeSession.is_accepted).toHaveBeenCalledWith(mockPosterArticle);
    expect(result).toBe(false);
  });

  it("deberia agregar articulos al estado de la sesión", () => {
    sessionRegularMock.set_session_state(mockReception); 
    sessionRegularMock.receive_article(mockRegularArticle, mockUserFirst, '2024-11-01');
    expect(mockReception.add_article).toHaveBeenCalledWith(mockRegularArticle, mockUserFirst, '2024-11-01');
  });

  it("verificamos que el articulo fue agregado a la sesión", () => {
    sessionRegularMock.add_article_to_list(mockRegularArticle);
    expect(sessionRegularMock.count_articles()).toBe(1);
    expect(sessionRegularMock.articles()).toContain(mockRegularArticle);
  });

  it("verificamos que el articulo no se encuentra en la lista", () => {
    sessionRegularMock.add_article_to_list(mockRegularArticle);
    expect(sessionRegularMock.has_article(mockRegularArticle)).toBe(true);
    expect(sessionRegularMock.has_article(mockPosterArticle)).toBe(false);
  });

});

describe("La sesión en estado Bidding", () =>{

  it("se llama a send_article en este estado",()=>{
    sessionRegularMock.set_session_state(mockBidding); 
    sessionRegularMock.send_articles_randomly();
    expect(mockBidding.send_articles_randomly).toHaveBeenCalled();
  });

  it("debe tener al menos 3 revisores para asignar artículos aleatoriamente a revisores",()=>{
    sessionRegularMock.add_reviewer(mockUserFirst); 
    sessionRegularMock.add_reviewer(mockUserSecond); 
    expect(()=>{regularSessionType.send_articles_randomly()}).toThrow();
  })

  it("se debe asignar el bid al articulos si el articulo esta aceptado", () => {
    sessionRegularMock.set_session_state(mockBidding); 
    sessionRegularMock.receive_bids(mockRegularArticle, 'Interesado', mockUserFirst);
    expect(mockBidding.assign_bids).toHaveBeenCalledWith(mockRegularArticle, 'Interesado', mockUserFirst);
  });

  it("se asigna un revisor, si el usuario es revisor de la sesión", () => {
    sessionRegularMock.add_reviewer(mockUserFirst);
    sessionRegularMock.assign_reviewer_to_bid(mockRegularArticle, mockUserFirst);
    expect(mockRegularArticle.process_add_to_pending).toHaveBeenCalledWith(mockUserFirst);
  });

  it("mostrar error si el usuario no es revisor de la sesión", () => {
    expect(() => {session.assign_reviewer_to_bid(mockRegularArticle, mockUserFirst)}).toThrow();
  });

});


describe("La sesión en estado Asignación", () =>{

  it("se encarga de asignar revisores para cada articulos", () => {
    sessionRegularMock.set_session_state(mockAssignment); 
    sessionRegularMock.add_article_to_list(mockRegularArticle);
    sessionRegularMock.add_article_to_list(mockRegularArticle2);
    sessionRegularMock.assign_reviewers_to_article();
    expect(mockAssignment.assign_reviewers_to_article).toHaveBeenCalledWith();
  });
});

describe("La sesión en estado Revisión", () =>{

  it("mostrar error si no se encuentra el artículo", () => {
    sessionRegularMock.add_reviewer(mockUserFirst); 
    expect(() => {sessionRegularMock.receive_score(mockRegularArticle, mockUserFirst, 2, 'Algunas observaciones que se consideran son...')}).toThrow();
  });

  it("con puntuación igual a 4, mostrar error porque esta fuera del rango -3 a 3", () => {
    sessionRegularMock.add_reviewer(mockUserFirst); 
    sessionRegularMock.add_article_to_list(mockRegularArticle);
    expect(() => {sessionRegularMock.receive_score(mockRegularArticle, mockUserFirst, 4, 'Algunas observaciones que se consideran son...')}).toThrow();
  });

  it("la puntuación debe considerar a -3", () => {
    sessionRegularMock.add_reviewer(mockUserFirst); 
    sessionRegularMock.add_article_to_list(mockRegularArticle);
    const accepted_article = () => {sessionRegularMock.receive_score(mockRegularArticle, mockUserFirst, -3, 'Algunas observaciones que se consideran son...')}
    expect(accepted_article).not.toThrow();
  });

  it("la puntuación debe considerar a 3", () => {
    sessionRegularMock.add_reviewer(mockUserFirst); 
    sessionRegularMock.add_article_to_list(mockRegularArticle);
    const accepted_article = () => {sessionRegularMock.receive_score(mockRegularArticle, mockUserFirst, 3, 'Algunas observaciones que se consideran son...')}
    expect(accepted_article).not.toThrow();
  });

  it("la puntuación debe considerar a 0", () => {
    sessionRegularMock.add_reviewer(mockUserFirst); 
    sessionRegularMock.add_article_to_list(mockRegularArticle);
    const accepted_article = () => {sessionRegularMock.receive_score(mockRegularArticle, mockUserFirst, 0, 'Algunas observaciones que se consideran son...')}
    expect(accepted_article).not.toThrow();
  });

  it("con puntuación igual a -4, mostrar error porque esta fuera del rango -3 a 3", () => {
    sessionRegularMock.add_reviewer(mockUserFirst); 
    sessionRegularMock.add_article_to_list(mockRegularArticle);
    expect(() => {sessionRegularMock.receive_score(mockRegularArticle, mockUserFirst, -4, 'Algunas observaciones que se consideran son...')}).toThrow();
  });

  it("mostrar error si el puntaje no es entero", () => {
    sessionRegularMock.add_reviewer(mockUserFirst); 
    sessionRegularMock.add_article_to_list(mockRegularArticle);
    expect(() => {sessionRegularMock.receive_score(mockRegularArticle, mockUserFirst, 2.5, 'Algunas observaciones que se consideran son...')}).toThrow();
  });

  it("asignar puntuación y observación si se cumplen todas las condiciones", () => {
    sessionRegularMock.set_session_state(mockAssignment); 
    sessionRegularMock.add_article_to_list(mockRegularArticle);
    sessionRegularMock.add_reviewer(mockUserFirst); 
    sessionRegularMock.receive_score(mockRegularArticle, mockUserFirst, 3, 'Este articulo esta excelente porque...');
    expect(mockAssignment.assign_score).toHaveBeenCalledWith(mockRegularArticle, mockUserFirst, 3, 'Este articulo esta excelente porque...');
  });

});

describe("La sesión en estado Selección", () =>{

  it('se define el numero maximo de articulos aceptados', () => {
    sessionRegularMock.define_num_max_accepted(5);
    expect(sessionRegularMock.num_max_accepted()).toBe(5);
  });

  it('se seleccionan los articulos con el metodo de Mejores', () => {
    mockRegularArticle.final_score.mockReturnValue(9);
    mockRegularArticle2.final_score.mockReturnValue(0);
    mockRegularArticle3.final_score.mockReturnValue(1);
    mockRegularArticle.calculate_final_score.mockReturnValue(9);
    mockRegularArticle2.calculate_final_score.mockReturnValue(0);
    mockRegularArticle3.calculate_final_score.mockReturnValue(1);
    sessionRegularMock.add_article_to_list(mockRegularArticle);
    sessionRegularMock.add_article_to_list(mockRegularArticle2);
    sessionRegularMock.add_article_to_list(mockRegularArticle3);

    const bestMethod = new BestMethod(6);
    sessionRegularMock.set_selection_method(bestMethod);
    sessionRegularMock.define_num_max_accepted(2);
    sessionRegularMock.start_articles_select();
    expect(sessionRegularMock.selected_articles()).toEqual([mockRegularArticle]);
  });

  it('se seleccionan los articulos con el metodo de Corte Fijo', () => {
    mockRegularArticle.final_score.mockReturnValue(8);
    mockRegularArticle2.final_score.mockReturnValue(2);
    mockRegularArticle3.final_score.mockReturnValue(6);
    mockRegularArticle4.final_score.mockReturnValue(9);

    mockRegularArticle.calculate_final_score.mockReturnValue(8);
    mockRegularArticle2.calculate_final_score.mockReturnValue(6);
    mockRegularArticle3.calculate_final_score.mockReturnValue(5);
    mockRegularArticle4.calculate_final_score.mockReturnValue(7);

    sessionRegularMock.add_article_to_list(mockRegularArticle);
    sessionRegularMock.add_article_to_list(mockRegularArticle2);
    sessionRegularMock.add_article_to_list(mockRegularArticle3);

    const fixedCutMethod = new FixedCutMethod(50);
    sessionRegularMock.set_selection_method(fixedCutMethod);
    sessionRegularMock.define_num_max_accepted(2);
    sessionRegularMock.start_articles_select();
    expect(sessionRegularMock.selected_articles().map(article => article.get_details())).toEqual([
      mockRegularArticle.get_details(),
      mockRegularArticle4.get_details()
    ]);

  });
});






