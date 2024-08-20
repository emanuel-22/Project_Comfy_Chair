const User = require('./User');
const RegularArticle = require('./RegularArticle');


let userFirst;

jest.mock('./RegularArticle');

beforeEach( ()=> {
  userFirst = new User('Barboza', 'Emanuel', 'UNSa', 'emanuelbarboza5@gmail.com', 'asdasd');
  userSecond = new User('Mendez', 'Maria', 'UNSa', 'mendezmaria@gmail.com', 'asdasd');
  regularArticle = new RegularArticle(
    'IT Project Failures, Causes and Cures', 
    'https://refactoring.guru/design-patterns/state',
    'Despite decades of research, IT projects continue to experience high failure rates, often attributed to poor project management, cost estimation, and requirements gathering. However, simply identifying these causes is insufficient to prevent them. This study adopts an aviation-inspired accident investigation approach to explore the root causes of IT project failures. Through a forensic analysis of five large government IT projects in Denmark, we uncovered 37 root causes and 22 potential cures. Notably, only one cause was programming-related, and each project suffered from around 15 causes. Moreover, 27 of the identified causes are not reported in existing research literature, highlighting the importance of this study. The findings provide valuable insights for educators, policymakers, and practitioners, informing the development of targeted interventions to prevent IT project failures. By understanding the underlying causes, we can develop effective strategies to mitigate them, ultimately improving the success rates of IT projects.'
  );
});

//----------------------------------------------------------------------
describe("Un usuario de la ComfyChair ", ()=>{

  it("no puede ingresarse un rol distinto de Chair, Autor o Revisor",()=>{
    let different_role = ()=>{userFirst.create_role('Administrativo')};
    expect(different_role).toThrow();
  })

  it("puede tener mas de un rol",()=>{
    userFirst.add_role('Chair');
    userFirst.add_role('Autor');
    expect(userFirst.has_role('Chair')).toBe(true);
    expect(userFirst.has_role('Autor')).toBe(true);
  })

  it("no puede tener el mismo rol 2 veces",()=>{
    userFirst.add_role('Chair');
    userFirst.add_role('Autor');
    let duplicate_role = ()=>{userFirst.add_role('Autor')};
    expect(duplicate_role).toThrow();
  })

  it("sin rol Chair, no puede crear una conferencia",()=>{
    userFirst.add_role('Autor');
    expect(() => {
      userFirst.create_conference('IA International', '2023/06/12', '09:00', '2023/06/18', '18:00');
    }).toThrow();
  })

  it("sin rol Chair, no puede crear una conferencia",()=>{
    userFirst.add_role('Autor');
    userSecond.add_role('Revisor');
    expect(() => {
      userFirst.assign_article_to_reviewer(regularArticle, userSecond);
    }).toThrow();
  })

  it("sin rol Autor, no puede enviar articulos",()=>{
    userFirst.add_role('Autor');
    userSecond.add_role('Revisor');
    expect(() => {
      userFirst.assign_article_to_reviewer(regularArticle, userSecond);
    }).toThrow();
  })

})




