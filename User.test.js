const User = require('./User');
const Session = require('./Session');
const RegularSession = require('./RegularSession');
const RegularArticle = require('./RegularArticle');


let userFirst;

jest.mock('./RegularArticle');
jest.mock('./Session');
jest.mock('./RegularSession');

let firstDate, firstHour, secondDate, secondHour;

beforeEach( ()=> {
  timestamp = Date.now();
  date = new Date(timestamp);
  date_finally = date.toISOString().split('T')[0];

  firstDate = new Date(2023, 5, 12);
  firstHour = new Date().setHours(9, 0, 0, 0);
  secondDate = new Date(2023, 6, 18);
  secondHour = new Date().setHours(18, 0, 0, 0);

  userFirst = new User('Barboza', 'Emanuel', 'UNSa', 'emanuelbarboza5@gmail.com', 'asdasd');
  userSecond = new User('Mendez', 'Maria', 'UNSa', 'mendezmaria@gmail.com', 'asdasd');

  regularArticle = new RegularArticle(
    'IT Project Failures, Causes and Cures', 
    'https://refactoring.guru/design-patterns/state',
    'Despite decades of research, IT projects continue to experience high failure rates, often attributed to poor project management, cost estimation, and requirements gathering. However, simply identifying these causes is insufficient to prevent them. This study adopts an aviation-inspired accident investigation approach to explore the root causes of IT project failures. Through a forensic analysis of five large government IT projects in Denmark, we uncovered 37 root causes and 22 potential cures. Notably, only one cause was programming-related, and each project suffered from around 15 causes. Moreover, 27 of the identified causes are not reported in existing research literature, highlighting the importance of this study. The findings provide valuable insights for educators, policymakers, and practitioners, informing the development of targeted interventions to prevent IT project failures. By understanding the underlying causes, we can develop effective strategies to mitigate them, ultimately improving the success rates of IT projects.'
  );

  regularSessionType = new Session('Agentes y Sistemas Inteligentes', new RegularSession(), date_finally);

});

//----------------------------------------------------------------------
describe("Un usuario de la ComfyChair ", ()=>{

  it("no puede ingresarse un rol distinto de Chair, Autor o Revisor",()=>{
    let different_role = ()=>{userFirst.create_role('Administrativo')};
    expect(different_role).toThrow();
  });

  it("puede tener mas de un rol",()=>{
    userFirst.add_role('Chair');
    userFirst.add_role('Autor');
    expect(userFirst.has_role('Chair')).toBe(true);
    expect(userFirst.has_role('Autor')).toBe(true);
  });

  it("no puede tener el mismo rol 2 veces",()=>{
    userFirst.add_role('Chair');
    userFirst.add_role('Autor');
    let duplicate_role = ()=>{userFirst.add_role('Autor')};
    expect(duplicate_role).toThrow();
  });

  it("con rol Chair, puede crear una conferencia",()=>{
    userFirst.add_role('Chair');
    expect(() => {
      userFirst.create_conference('IA International', 
        firstDate.toISOString().split('T')[0], firstHour, 
        secondDate.toISOString().split('T')[0], secondHour
      );
    }).not.toThrow();
  });

  it("sin rol Chair, no puede crear una conferencia",()=>{
    expect(() => {
      userFirst.create_conference('IA International', 
        firstDate.toISOString().split('T')[0], firstHour, 
        secondDate.toISOString().split('T')[0], secondHour
      );
    }).toThrow();
  });

  it("con rol Autor, puede enviar articulos",()=>{
    userFirst.add_role('Autor');
    expect(() => {
      userFirst.send_article(regularArticle, regularSessionType, date_finally);
    }).not.toThrow();
  });

  it("sin rol Autor, no puede enviar articulos",()=>{
    expect(() => {
      userFirst.send_article(regularArticle, regularSessionType, date_finally);
    }).toThrow();
  });

  it("con rol Revisor, puede enviar bids de un articulo",()=>{
    userFirst.add_role('Revisor');
    expect(() => {
      userFirst.send_bids(regularArticle, regularSessionType, 'Interesado');
    }).not.toThrow();
  });

  it("sin rol Revisor, no puede enviar bids de un articulo",()=>{
    expect(() => {
      userFirst.send_bids(regularArticle, regularSessionType, 'Interesado');
    }).toThrow();
  });

  it("con rol Chair, puede asignar un artículo a un Revisor",()=>{
    userFirst.add_role('Chair');
    userSecond.add_role('Revisor');
    expect(() => {
      userFirst.assign_article_to_reviewer(regularArticle, regularSessionType, userSecond);
    }).not.toThrow();
  });

  it("sin rol Chair, no puede asignar un artículo a un Revisor",()=>{
    userSecond.add_role('Revisor');
    expect(() => {
      userFirst.assign_article_to_reviewer(regularArticle, regularSessionType, userSecond);
    }).toThrow();
  });

  it("con rol Revisor, puede mandar puntaje de un artículo",()=>{
    userFirst.add_role('Revisor');
    expect(() => {
      userFirst.send_score(regularArticle, regularSessionType, 4, 'Algunas de las correcciones son las siguientes...');
    }).not.toThrow();
  })

  it("sin rol Revisor, no puede mandar puntaje de un artículo",()=>{
    expect(() => {
      userFirst.send_score(regularArticle, regularSessionType, 4, 'Algunas de las correcciones son las siguientes...');
    }).toThrow();
  })

})




