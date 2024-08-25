const User = require('./User');
const RegularArticle = require('./RegularArticle');
const RegularSession = require('./RegularSession');
const Session = require('./Session');


beforeEach(async ()=> {

  timestamp = Date.now();
  date = new Date(timestamp);
  deadline = date.toISOString().split('T')[0];
  regularSessionType = new Session('Agentes y Sistemas Inteligentes', new RegularSession(), deadline);

  user_first = new User('Cruz', 'Rosana', 'UNSa', 'cruzrosana@gmail.com', 'asdasd');
  user_first.add_role('Autor');
  user_second = new User('Mendez', 'Maria', 'UNLP', 'mariamendez@gmail.com', 'asdasd');
  user_second.add_role('Autor');
  user_third = new User('Mendez', 'Mariano', 'UNJU', 'marianomendez@gmail.com', 'asdasd');
  user_third.add_role('Autor');

  user_fourth = new User('Rodriguez', 'Maria', 'UNLP', 'mariarodriguez@gmail.com', 'asdasd');
  user_fifth = new User('Lopez', 'Rosa', 'UNLP', 'lopezrosa@gmail.com', 'asdasd');
  user_sixth = new User('Rodriguez', 'Dalma', 'UNJU', 'dalmarodriguez@gmail.com', 'asdasd');

  
  dateOther = new Date('2024-07-27');
  shippingDate = dateOther.toISOString().split('T')[0]; //2024-07-27
  // -------------------------------------Primer Articulo--------------------------------------
  regularArticle = new RegularArticle(
    'IT Project Failures, Causes and Cures', 
    'https://refactoring.guru/design-patterns/state',
    'Despite decades of research, IT projects continue to experience high failure rates, often attributed to poor project management, cost estimation, and requirements gathering. However, simply identifying these causes is insufficient to prevent them. This study adopts an aviation-inspired accident investigation approach to explore the root causes of IT project failures. Through a forensic analysis of five large government IT projects in Denmark, we uncovered 37 root causes and 22 potential cures. Notably, only one cause was programming-related, and each project suffered from around 15 causes. Moreover, 27 of the identified causes are not reported in existing research literature, highlighting the importance of this study. The findings provide valuable insights for educators, policymakers, and practitioners, informing the development of targeted interventions to prevent IT project failures. By understanding the underlying causes, we can develop effective strategies to mitigate them, ultimately improving the success rates of IT projects.'
  );
  regularArticle.add_author(user_first);
  user_first.send_article(regularArticle, regularSessionType, shippingDate);

  // -------------------------------------Segundo Articulo--------------------------------------
  regularArticle2 = new RegularArticle(
    'Review and critique of the information systems development project failure literature: An argument for exploring information systems development project distress', 
    'https://refactoring.guru/design-patterns/state',
    'Despite decades of research, IT projects continue to experience high failure rates, often attributed to poor project management, cost estimation, and requirements gathering. However, simply identifying these causes is insufficient to prevent them. This study adopts an aviation-inspired accident investigation approach to explore the root causes of IT project failures. Through a forensic analysis of five large government IT projects in Denmark, we uncovered 37 root causes and 22 potential cures. Notably, only one cause was programming-related, and each project suffered from around 15 causes. Moreover, 27 of the identified causes are not reported in existing research literature, highlighting the importance of this study. The findings provide valuable insights for educators, policymakers, and practitioners, informing the development of targeted interventions to prevent IT project failures. By understanding the underlying causes, we can develop effective strategies to mitigate them, ultimately improving the success rates of IT projects.'
  );
  regularArticle2.add_author(user_second);
  user_second.send_article(regularArticle2, regularSessionType, shippingDate);

  // -------------------------------------Tercer Articulo--------------------------------------
  regularArticle3 = new RegularArticle(
    'Shared leadership and project success: The roles of knowledge sharing,cohesion and trust in the team',
    'https://refactoring.guru/state',
    'Despite decades of research, IT projects continue to experience high failure rates, often attributed to poor project management, cost estimation, and requirements gathering. However, simply identifying these causes is insufficient to prevent them. This study adopts an aviation-inspired accident investigation approach to explore the root causes of IT project failures. Through a forensic analysis of five large government IT projects in Denmark, we uncovered 37 root causes and 22 potential cures. Notably, only one cause was programming-related, and each project suffered from around 15 causes. Moreover, 27 of the identified causes are not reported in existing research literature, highlighting the importance of this study. The findings provide valuable insights for educators, policymakers, and practitioners, informing the development of targeted interventions to prevent IT project failures. By understanding the underlying causes, we can develop effective strategies to mitigate them, ultimately improving the success rates of IT projects.'
  );
  regularArticle3.add_author(user_third);
  user_third.send_article(regularArticle3, regularSessionType, shippingDate);

  //-------------------------------------Cuarto Articulo--------------------------------------
  regularArticle4 = new RegularArticle(
    'Software Project Failure Process Definition',
    'https://refactoring.guru/',
    'Despite decades of research, IT projects continue to experience high failure rates, often attributed to poor project management, cost estimation, and requirements gathering. However, simply identifying these causes is insufficient to prevent them. This study adopts an aviation-inspired accident investigation approach to explore the root causes of IT project failures. Through a forensic analysis of five large government IT projects in Denmark, we uncovered 37 root causes and 22 potential cures. Notably, only one cause was programming-related, and each project suffered from around 15 causes. Moreover, 27 of the identified causes are not reported in existing research literature, highlighting the importance of this study. The findings provide valuable insights for educators, policymakers, and practitioners, informing the development of targeted interventions to prevent IT project failures. By understanding the underlying causes, we can develop effective strategies to mitigate them, ultimately improving the success rates of IT projects.'
  );
  regularArticle4.add_author(user_third);
  user_third.send_article(regularArticle4, regularSessionType, shippingDate);

  // -------------------------------------Quinto Articulo--------------------------------------
  regularArticle5 = new RegularArticle(
    'EXTREME PROGRAMMING VS SCRUM: A COMPARISON OF AGILE MODELS',
    'https://refactoring.guru/',
    'Despite decades of research, IT projects continue to experience high failure rates, often attributed to poor project management, cost estimation, and requirements gathering. However, simply identifying these causes is insufficient to prevent them. This study adopts an aviation-inspired accident investigation approach to explore the root causes of IT project failures. Through a forensic analysis of five large government IT projects in Denmark, we uncovered 37 root causes and 22 potential cures. Notably, only one cause was programming-related, and each project suffered from around 15 causes. Moreover, 27 of the identified causes are not reported in existing research literature, highlighting the importance of this study. The findings provide valuable insights for educators, policymakers, and practitioners, informing the development of targeted interventions to prevent IT project failures. By understanding the underlying causes, we can develop effective strategies to mitigate them, ultimately improving the success rates of IT projects.'
  );
  regularArticle5.add_author(user_first);
  user_first.send_article(regularArticle5, regularSessionType, shippingDate);

  regularSessionType.proceed(); // Nos movemos de Recepción a Bidding

  regularArticle6 = new RegularArticle(
    'Analisis y Diseño de Sistemas',
    'https://disenodesistemas.guru/',
    'Despite decades of research, IT projects continue to experience high failure rates, often attributed to poor project management, cost estimation, and requirements gathering. However, simply identifying these causes is insufficient to prevent them. This study adopts an aviation-inspired accident investigation approach to explore the root causes of IT project failures. Through a forensic analysis of five large government IT projects in Denmark, we uncovered 37 root causes and 22 potential cures. Notably, only one cause was programming-related, and each project suffered from around 15 causes. Moreover, 27 of the identified causes are not reported in existing research literature, highlighting the importance of this study. The findings provide valuable insights for educators, policymakers, and practitioners, informing the development of targeted interventions to prevent IT project failures. By understanding the underlying causes, we can develop effective strategies to mitigate them, ultimately improving the success rates of IT projects.'
  );
  regularArticle6.add_author(user_third);

});


describe("Las sesiones en Bidding", () =>{

  it("no acepta mas articulos",()=>{
    let invalideted = ()=>{regularSessionType.receive_article(regularSessionType, shippingDate)};
    expect(invalideted).toThrow();
  })

  it("puede tener varios revisores",()=>{
    regularSessionType.add_reviewer(user_third); 
    regularSessionType.add_reviewer(user_fourth); 
    expect(regularSessionType.reviewers()).toContainEqual(user_third, user_fourth);
  })

  it("no puede tener el mismo revisor en la lista de revisores 2 veces",()=>{
    regularSessionType.add_reviewer(user_fifth); 
    regularSessionType.add_reviewer(user_sixth); 
    let duplicated_reviewer = ()=>{regularSessionType.add_reviewer(user_sixth)};
    expect(duplicated_reviewer).toThrow();  
  })

  it("debe tener el número de revisiones = Cant. de articulos * 3 ",()=>{
    expect(regularSessionType.count_reviews()).toEqual(15);
  })

  it("debe tener al menos 3 revisores",()=>{
    let cond_without_reviewers = ()=>{regularSessionType.send_articles_randomly()};
    expect(cond_without_reviewers).toThrow();
  })

  it("debe tener al menos 3 revisores para asignar artículos aleatoriamente a revisores",()=>{
    regularSessionType.add_reviewer(user_third); 
    regularSessionType.add_reviewer(user_fourth); 
    let error_msg = ()=>{regularSessionType.send_articles_randomly()};
    expect(error_msg).toThrow();
  })

  it("asigna artículos aleatoriamente a revisores",()=>{
    regularSessionType.add_reviewer(user_third); 
    regularSessionType.add_reviewer(user_fourth); 
    regularSessionType.add_reviewer(user_fifth);
    regularSessionType.send_articles_randomly();
    expect(regularArticle.count_pending_reviewers()).toEqual(3);
    expect(regularArticle2.count_pending_reviewers()).toEqual(3);
    expect(regularArticle3.count_pending_reviewers()).toEqual(3);
    expect(regularArticle4.count_pending_reviewers()).toEqual(3);
    expect(regularArticle5.count_pending_reviewers()).toEqual(3);
  })

})

describe("Un Chair", () =>{

  it("puede asignar un artículo a un revisor",()=>{
    user_first.add_role('Chair');
    regularSessionType.add_reviewer(user_fifth); 
    user_first.assign_article_to_reviewer(regularArticle, regularSessionType, user_fifth);
    expect(regularArticle.count_pending_reviewers()).toBe(1);
  })

  it("no puede enviar el mismo artículo 2 veces al mismo revisor",()=>{
    user_first.add_role('Chair');
    regularSessionType.add_reviewer(user_second); 
    user_first.assign_article_to_reviewer(regularArticle, regularSessionType, user_second);
    let invalideted_duplicated = ()=>{user_first.assign_article_to_reviewer(regularArticle, user_second)};
    expect(invalideted_duplicated).toThrow();
  })

  it("debe enviar un artículo a un revisor de la sesion",()=>{
    user_first.add_role('Chair');
    let is_not_reviewer = ()=>{user_first.assign_article_to_reviewer(regularArticle, user_second)};
    expect(is_not_reviewer).toThrow();
  })
})


describe("Un Revisor", () =>{

  it("con solo este rol, no puede asignar un artículo a otro revisor",()=>{
    user_first.add_role('Revisor');
    regularSessionType.add_reviewer(user_fifth); 
    let invalideted = ()=>{user_first.assign_article_to_reviewer(regularArticle, user_fifth)};
    expect(invalideted).toThrow();
  })

  it("expresa interés de un articulo solo si fue aceptado durante la etapa de recepción",()=>{
    regularSessionType.add_reviewer(user_sixth); 
    let invalideted = ()=>{user_sixth.send_bids(regularArticle6, regularSessionType, 'Interesado');};
    expect(invalideted).toThrow();
  })

  it("expresa 'interés' en un artículo",()=>{
    regularSessionType.add_reviewer(user_fourth); 
    user_fourth.send_bids(regularArticle, regularSessionType, 'Interesado');
    expect(regularArticle.count_interested()).toEqual(1);
  })

  it("expresa 'no interés' en un artículo",()=>{
    regularSessionType.add_reviewer(user_fifth); 
    regularSessionType.add_reviewer(user_third); 
    user_fifth.send_bids(regularArticle, regularSessionType, 'No interesado');
    user_third.send_bids(regularArticle, regularSessionType, 'No interesado');
    expect(regularArticle.count_not_interested()).toEqual(2);
  })

  it("expresa 'un quizás' en un artículo",()=>{
    regularSessionType.add_reviewer(user_third); 
    regularSessionType.add_reviewer(user_fifth); 
    regularSessionType.add_reviewer(user_sixth);
    user_third.send_bids(regularArticle, regularSessionType, 'Quizas');
    user_fifth.send_bids(regularArticle, regularSessionType, 'Quizas');
    user_sixth.send_bids(regularArticle, regularSessionType, 'Quizas');
    expect(regularArticle.count_maybe()).toEqual(3);
  })

  it("puede cambiar de opinión respecto a un bid",()=>{
    regularSessionType.add_reviewer(user_third); 
    regularSessionType.add_reviewer(user_fifth); 
    user_third.send_bids(regularArticle, regularSessionType, 'Quizas');
    user_fifth.send_bids(regularArticle, regularSessionType, 'Quizas');
    user_fifth.send_bids(regularArticle, regularSessionType, 'Interesado');
    expect(regularArticle.count_maybe()).toEqual(1);
    expect(regularArticle.count_interested()).toEqual(1);
  })

  it("debe expresar 'Interesado, No interesado o Quizas'",()=>{
    regularSessionType.add_reviewer(user_third); 
    let invalideted = ()=>{user_third.send_bids(regularArticle, regularSessionType, 'No podria')};
    expect(invalideted).toThrow();
  })

})




describe("Un Autor", () =>{
  it("con solo este rol, no puede asignar un artículo a otro revisor",()=>{
    regularSessionType.add_reviewer(user_fifth); 
    let invalideted = ()=>{ user_first.assign_article_to_reviewer(regularArticle, user_fifth)};
    expect(invalideted).toThrow();
  })
})

describe("Un Articulo", () =>{
  it("puede tener varios revisores en la lista de pendiente de revisores",()=>{
    user_first.add_role('Chair');
    regularSessionType.add_reviewer(user_fifth); 
    regularSessionType.add_reviewer(user_fourth); 
    user_first.assign_article_to_reviewer(regularArticle, regularSessionType, user_fifth); 
    user_first.assign_article_to_reviewer(regularArticle, regularSessionType, user_fourth); 
    expect(regularArticle.count_pending_reviewers()).toEqual(2);
  })
})