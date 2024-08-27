const Poster = require('./Poster');
const PosterSession = require('./PosterSession');
const Session = require('./Session');
const FixedCutMethod = require('./FixedCutMethod');
const BestMethod = require('./BestMethod');


beforeEach(async ()=> {
  timestamp = Date.now();
  date = new Date(timestamp);
  deadline = date.toISOString().split('T')[0];

  posterSessionType = new Session('Agentes y Sistemas Inteligentes', new PosterSession(), deadline);
  posterSessionType.proceed(); // Nos movemos de Recepción a Bidding
  posterSessionType.proceed(); // Nos movemos de Bidding a Asignacion
  posterSessionType.proceed(); // Nos movemos de Asignacion a Revision
  posterSessionType.proceed(); // Nos movemos de Revision a Selección

  posterArticle = new Poster(
    'Implementacion de metodologia agil a organizaciones no gubernamentales', 
    'https://refactoring.guru/design-patterns/state',
    'https://developero.io/blog/jest-mock-module-function-class-promises-axios-y-mas'
  );

  fixedcut_method = FixedCutMethod(0.50);
  fixedcut_method = BestMethod(4);
});

describe("En la etapa de Selección, las sesiones", () =>{

  it('deberia proceder de Recepcion, a Bidding, a Asignación, a Revisión y a Selección de forma correcta', () => {
    expect(posterSessionType.session_name_state()).toBe('Seleccion');
  });

  it("El puntaje debe ser entre -3 a 3, inclusive el 0",()=>{
    posterSessionType.add_article_to_list(posterArticle)
    posterSessionType.add_reviewer(userFirst); 
    posterSessionType.add_reviewer(userSecond); 
    posterSessionType.add_reviewer(userThird); 
    posterArticle.process_assign_bid('Interesado', userFirst);
    posterArticle.process_assign_bid('Interesado', userSecond);
    posterArticle.process_assign_bid('Interesado', userThird);
    posterArticle.process_assign_reviewers();
    posterSessionType.receive_score(posterArticle, userFirst, 1 , 'Algunas consideraciones son...');
    posterSessionType.receive_score(posterArticle, userSecond, 3, 'Algunas observaciones son...');
    posterSessionType.receive_score(posterArticle, userThird, -2, 'Para tener en cuenta se podria...');

    posterSessionType.set_selection_method(fixedcut_method);
    posterSessionType.start_articles_select();
  });

})