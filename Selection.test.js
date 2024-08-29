const PosterSession = require('./PosterSession');
const Session = require('./Session');
const Selection = require('./Selection');

beforeEach(async ()=> {
  timestamp = Date.now();
  date = new Date(timestamp);
  deadline = date.toISOString().split('T')[0];

  posterSessionType = new Session('Agentes y Sistemas Inteligentes', new PosterSession(), deadline);
  posterSessionType.start_articles_select = jest.fn();
  selection_state = new Selection(posterSessionType);
});

describe("En la etapa de Selección, las sesiones", () =>{

  it('deberia proceder de Recepcion, Bidding, Asignación, Revisión y a Selección de forma correcta', () => {
    posterSessionType.proceed(); // Nos movemos de Recepción a Bidding
    posterSessionType.proceed(); // Nos movemos de Bidding a Asignacion
    posterSessionType.proceed(); // Nos movemos de Asignacion a Revision
    posterSessionType.proceed(); // Nos movemos de Revision a Selección
    expect(selection_state.name_state()).toBe('Seleccion');
  });

  it("debería lanzar un error al intentar agregar un artículo",()=>{
    expect(() => selection_state.add_article({}, new Date())).toThrow();
  });

  test('debería llamar a start_articles_select en de la clase Sesión', () => {
    selection_state.start_articles_select();
    expect(posterSessionType.start_articles_select).toHaveBeenCalled(); 
  });

  //it("El puntaje debe ser entre -3 a 3, inclusive el 0",()=>{
    //posterSessionType.add_article_to_list(posterArticle)
    // posterSessionType.add_reviewer(userFirst); 
    // posterSessionType.add_reviewer(userSecond); 
    // posterSessionType.add_reviewer(userThird); 
    // posterArticle.process_assign_bid('Interesado', userFirst);
    // posterArticle.process_assign_bid('Interesado', userSecond);
    // posterArticle.process_assign_bid('Interesado', userThird);
    // posterArticle.process_assign_reviewers();
    // posterSessionType.receive_score(posterArticle, userFirst, 1 , 'Algunas consideraciones son...');
    // posterSessionType.receive_score(posterArticle, userSecond, 3, 'Algunas observaciones son...');
    // posterSessionType.receive_score(posterArticle, userThird, -2, 'Para tener en cuenta se podria...');
    
    // posterSessionType.define_num_max_accepted(3);
    // posterSessionType.set_selection_method(fixedcut_method);
    // posterSessionType.start_articles_select();
  //});

})