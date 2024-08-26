const Poster = require('./Poster');
const PosterSession = require('./PosterSession');
const Session = require('./Session');

beforeEach(async ()=> {
  timestamp = Date.now();
  date = new Date(timestamp);
  deadline = date.toISOString().split('T')[0];

  dateOther = new Date('2024-07-27');
  shippingDate = dateOther.toISOString().split('T')[0]; //2024-07-27

  posterSessionType = new Session('Agentes y Sistemas Inteligentes', new PosterSession(), deadline);
  posterSessionType.proceed(); // Nos movemos de Recepción a Bidding
  posterSessionType.proceed(); // Nos movemos de Bidding a Asignacion
  posterSessionType.proceed(); // Nos movemos de Asignacion a Revision

 

  posterArticle = new Poster(
      'Implementacion de metodologia agil a organizaciones no gubernamentales', 
      'https://refactoring.guru/design-patterns/state',
      'https://developero.io/blog/jest-mock-module-function-class-promises-axios-y-mas'
  );
});

describe("En la etapa de Asignacion, las sesiones", () =>{
  it('deberia proceder de Recepcion a Bidding, de Bidding a Asignación y de Asignacion a Revisión de forma correcta', () => {
    expect(posterSessionType.session_name_state()).toBe('Revision');
  });

})
  