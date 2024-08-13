const User = require('./User');
const RegularArticle = require('./RegularArticle');
const RegularSession = require('./RegularSession');
const Session = require('./Session');


beforeEach(async ()=> {
  timestamp = Date.now();
  date = new Date(timestamp);
  date_finally = date.toISOString().split('T')[0];
  regularSessionType = new Session('Agentes y Sistemas Inteligentes', new RegularSession(), date_finally);

  user_first = new User('Cruz', 'Rosana', 'UNSa', 'cruzrosana@gmail.com', 'asdasd');
  user_second = new User('Mendez', 'Maria', 'UNLP', 'mariamendez@gmail.com', 'asdasd');


  user_third = new User('Mendez', 'Mariano', 'UNJU', 'marianomendez@gmail.com', 'asdasd');
  user_fourth = new User('Rodriguez', 'Maria', 'UNLP', 'mariarodriguez@gmail.com', 'asdasd');
  user_fifth = new User('Lopez', 'Rosa', 'UNLP', 'lopezrosa@gmail.com', 'asdasd');
  user_sixth = new User('Rodriguez', 'Dalma', 'UNJU', 'dalmarodriguez@gmail.com', 'asdasd');

  // -------------------------------------Primer Articulo--------------------------------------
  regularArticle = new RegularArticle(
    'IT Project Failures, Causes and Cures', 
    'https://refactoring.guru/design-patterns/state',
    'Despite decades of research, IT projects continue to experience high failure rates, often attributed to poor project management, cost estimation, and requirements gathering. However, simply identifying these causes is insufficient to prevent them. This study adopts an aviation-inspired accident investigation approach to explore the root causes of IT project failures. Through a forensic analysis of five large government IT projects in Denmark, we uncovered 37 root causes and 22 potential cures. Notably, only one cause was programming-related, and each project suffered from around 15 causes. Moreover, 27 of the identified causes are not reported in existing research literature, highlighting the importance of this study. The findings provide valuable insights for educators, policymakers, and practitioners, informing the development of targeted interventions to prevent IT project failures. By understanding the underlying causes, we can develop effective strategies to mitigate them, ultimately improving the success rates of IT projects.'
  );
  user_first.add_role('Autor');
  regularArticle.add_author(user_first);
  user_first.send_article(regularArticle, regularSessionType, date_finally);

  // -------------------------------------Segundo Articulo--------------------------------------
  regularArticle2 = new RegularArticle(
    'Review and critique of the information systems development project failure literature: An argument for exploring information systems development project distress', 
    'https://refactoring.guru/design-patterns/state',
    'Despite decades of research, IT projects continue to experience high failure rates, often attributed to poor project management, cost estimation, and requirements gathering. However, simply identifying these causes is insufficient to prevent them. This study adopts an aviation-inspired accident investigation approach to explore the root causes of IT project failures. Through a forensic analysis of five large government IT projects in Denmark, we uncovered 37 root causes and 22 potential cures. Notably, only one cause was programming-related, and each project suffered from around 15 causes. Moreover, 27 of the identified causes are not reported in existing research literature, highlighting the importance of this study. The findings provide valuable insights for educators, policymakers, and practitioners, informing the development of targeted interventions to prevent IT project failures. By understanding the underlying causes, we can develop effective strategies to mitigate them, ultimately improving the success rates of IT projects.'
  );
  user_second.add_role('Autor');
  regularArticle2.add_author(user_second);
  user_second.send_article(regularArticle2, regularSessionType, date_finally);

  regularSessionType.proceed(); // Nos movemos de Recepción a Bidding
  
});


describe("Las sesiones de cualquier tipo", () =>{
  it("puede tener varios revisores ",()=>{
    regularSessionType.add_reviewer(user_third); 
    regularSessionType.add_reviewer(user_fourth); 
    expect(regularSessionType.reviewers()).toContainEqual(user_third, user_fourth);
  })
  it("no puede tener el mismo revisor 2 veces",()=>{
    regularSessionType.add_reviewer(user_fifth); 
    regularSessionType.add_reviewer(user_sixth); 
    let duplicated_reviewer = ()=>{regularSessionType.add_reviewer(user_sixth)};
    expect(duplicated_reviewer).toThrow();  
  })
  it("debe tener el numero de revisiones igual a la cantidad de articulos * 3 ",()=>{
    bidding_state = regularSessionType.session_state()
    expect(bidding_state.count_reviews()).toEqual(6);
  })
  it("asigna artículos aleatoriamente a revisores",()=>{
    regularSessionType.add_reviewer(user_fourth); 
    regularSessionType.add_reviewer(user_fifth); 
    regularSessionType.add_reviewer(user_sixth); 
    expect(() => {
      regularSessionType.send_articles_randomly();
      console.log(regularSessionType);
    }).not.toThrow();
  })
})

describe("Un chair", () =>{
  it("puede asignar un articulo a un revisor",()=>{
    user_first.add_role('Chair');
    regularSessionType.add_reviewer(user_fifth); 
    expect(() => {
      user_first.send_article_to_review(regularArticle, user_fifth); 
    }).not.toThrow();
  })
})

describe("Un Articulo", () =>{
  it("puede tener varios revisores en la lista de pendiente de revisores",()=>{
    user_first.add_role('Chair');
    regularSessionType.add_reviewer(user_fifth); 
    regularSessionType.add_reviewer(user_fourth); 
    user_first.send_article_to_review(regularArticle, user_fifth); 
    user_first.send_article_to_review(regularArticle, user_fourth); 
    expect(regularArticle.count_list_pending_reviewers()).toEqual(2);
  })
})