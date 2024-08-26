const User = require('./User');
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

  userFirst = new User('Cruz', 'Rosana', 'UNSa', 'cruzrosana@gmail.com', 'asdasd');
  userSecond = new User('Galvan', 'Lucas', 'UBA', 'lucasg@gmail.com', 'asdasd');
  userThird = new User('Mamani', 'Rosana', 'UNSa', 'mamanirosi@gmail.com', 'asdasd');
  userFourth = new User('Lopez', 'Juan', 'UNSa', 'juanlopez@gmail.com', 'asdasd');

  posterArticle = new Poster(
    'Implementacion de metodologia agil a organizaciones no gubernamentales', 
    'https://refactoring.guru/design-patterns/state',
    'https://developero.io/blog/jest-mock-module-function-class-promises-axios-y-mas'
  );
   
});


describe("En la etapa de Asignacion, las sesiones", () =>{
  it('deberia proceder de Recepcion a Bidding y de Bidding a Asignación de forma correcta', () => {
    expect(posterSessionType.session_name_state()).toBe('Asignacion');
  });

  it("no se aceptan mas articulos",()=>{
    let invalideted = ()=>{posterSessionType.receive_article(posterArticle, shippingDate)};
    expect(invalideted).toThrow();
  })

  it("asigno solo 3 revisores para cada articulo (Interesado, Interesado, Quizas)",()=>{
   
    posterSessionType.add_article_to_list(posterArticle)
    posterSessionType.add_reviewer(userFirst); 
    posterSessionType.add_reviewer(userFourth); 
    posterSessionType.add_reviewer(userSecond); 
    posterSessionType.add_reviewer(userThird); 

    posterArticle.process_assign_bid('Interesado', userFirst);
    posterArticle.process_assign_bid('Interesado', userSecond);
    posterArticle.process_assign_bid('Quizas', userThird);
    posterArticle.process_assign_bid('No interesado', userFourth);

    posterSessionType.assign_reviewers_to_article();
    expect(posterArticle.count_confirmed_reviewers_article()).toBe(3);
    expect(posterArticle.count_interesteds()).toBe(2);
    expect(posterArticle.count_maybes()).toBe(1);
  })

})