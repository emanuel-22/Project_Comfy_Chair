const User = require('./User');
const RegularArticle = require('./RegularArticle');
const RegularSession = require('./RegularSession');
const Session = require('./Session');



beforeEach(() => {
  timestamp = Date.now();
  date = new Date(timestamp);
  deadline = date.toISOString().split('T')[0];

  regularSessionType = new Session('Agentes y Sistemas Inteligentes', new RegularSession(), deadline);
  regularSessionType.proceed(); // Estamos en estado de Bidding

  dateOther = new Date('2024-07-27');
  shippingDate = dateOther.toISOString().split('T')[0]; //2024-07-27

  userFirst = new User('Cruz', 'Rosana', 'UNSa', 'cruzrosana@gmail.com', 'asdasd');
  userSecond = new User('Mendez', 'Maria', 'UNLP', 'mariamendez@gmail.com', 'asdasd');
  userThird = new User('Mendez', 'Mariano', 'UNJU', 'marianomendez@gmail.com', 'asdasd');
  userFourth = new User('Rodriguez', 'Maria', 'UNLP', 'mariarodriguez@gmail.com', 'asdasd');
  userFifth = new User('Lopez', 'Rosa', 'UNLP', 'lopezrosa@gmail.com', 'asdasd');
  userSixth = new User('Rodriguez', 'Dalma', 'UNJU', 'dalmarodriguez@gmail.com', 'asdasd');

  regularArticle = new RegularArticle(
    'IT Project Failures, Causes and Cures', 
    'https://refactoring.guru/design-patterns/state',
    'Despite decades of research, IT projects continue to experience high failure rates, often attributed to poor project management, cost estimation, and requirements gathering. However, simply identifying these causes is insufficient to prevent them. This study adopts an aviation-inspired accident investigation approach to explore the root causes of IT project failures. Through a forensic analysis of five large government IT projects in Denmark, we uncovered 37 root causes and 22 potential cures. Notably, only one cause was programming-related, and each project suffered from around 15 causes. Moreover, 27 of the identified causes are not reported in existing research literature, highlighting the importance of this study. The findings provide valuable insights for educators, policymakers, and practitioners, informing the development of targeted interventions to prevent IT project failures. By understanding the underlying causes, we can develop effective strategies to mitigate them, ultimately improving the success rates of IT projects.'
  );

});

describe('En la etapa de Bidding, las sesiones', () => {

  // it('deberia proceder de Recepcion a Bidding de forma correcta', () => {
  //   expect(regularSessionType.session_state().name()).toBe('Bidding');
  // });

//   it("no acepta mas articulos",()=>{
//     let invalideted = ()=>{regularSessionType.receive_article(regularArticle, userFirst, shippingDate)};
//     expect(invalideted).toThrow();
//   })

//   it("puede tener varios revisores",()=>{
//     regularSessionType.add_reviewer(userThird); 
//     regularSessionType.add_reviewer(userFourth); 
//     expect(regularSessionType.reviewers()).toContainEqual(userThird, userFourth);
//   })

//   it("no puede tener el mismo revisor en la lista de revisores 2 veces",()=>{
//     regularSessionType.add_reviewer(userFifth); 
//     regularSessionType.add_reviewer(userSixth); 
//     let duplicated_reviewer = ()=>{regularSessionType.add_reviewer(userSixth)};
//     expect(duplicated_reviewer).toThrow();  
//   })

//   it("debe tener el número de revisiones = Cant. de articulos * 3 ",()=>{
//     regularSessionType.add_article_to_list(regularArticle);
//     expect(regularSessionType.count_reviews()).toEqual(3);
//   })

  it("debe tener al menos 3 revisores",()=>{
    let cond_without_reviewers = ()=>{regularSessionType.send_articles_randomly()};
    expect(cond_without_reviewers).toThrow();
  })

//   it("debe tener al menos 3 revisores para asignar artículos aleatoriamente a revisores",()=>{
//     regularSessionType.add_reviewer(userThird); 
//     regularSessionType.add_reviewer(userFourth); 
//     let error_msg = ()=>{regularSessionType.send_articles_randomly()};
//     expect(error_msg).toThrow();
//   })

//   it("asigna artículos aleatoriamente a revisores",()=>{
//     regularSessionType.add_article_to_list(regularArticle)
//     regularSessionType.add_reviewer(userThird);
//     regularSessionType.add_reviewer(userFourth);
//     regularSessionType.add_reviewer(userFifth); 
 
//     regularSessionType.send_articles_randomly();
//     expect(regularArticle.count_pending_reviewers()).toEqual(3);
//   })

//   it("debe tener articulos para asignar artículos aleatoriamente a revisores",()=>{
//     regularSessionType.add_reviewer(userThird);
//     regularSessionType.add_reviewer(userFourth);
//     regularSessionType.add_reviewer(userFifth); 
 
//     let error_msg = ()=>{regularSessionType.send_articles_randomly()};
//     expect(error_msg).toThrow();
//   })
});


// describe("Un Chair", () =>{

//   it("puede asignar un artículo a un revisor",()=>{
//     userFirst.add_role('Chair');
//     regularSessionType.add_reviewer(userFifth); 
//     userFirst.assign_article_to_reviewer(regularArticle, regularSessionType, userFifth);
//     expect(regularArticle.count_pending_reviewers()).toBe(1);
//   })

//   it("no puede enviar el mismo artículo 2 veces al mismo revisor",()=>{
//     userFirst.add_role('Chair');
//     regularSessionType.add_reviewer(userSecond); 
//     userFirst.assign_article_to_reviewer(regularArticle, regularSessionType, userSecond);
//     let invalideted_duplicated = ()=>{userFirst.assign_article_to_reviewer(regularArticle, userSecond)};
//     expect(invalideted_duplicated).toThrow();
//   })

//   it("debe enviar un artículo a un revisor de la sesion",()=>{
//     userFirst.add_role('Chair');
//     let is_not_reviewer = ()=>{userFirst.assign_article_to_reviewer(regularArticle, userSecond)};
//     expect(is_not_reviewer).toThrow();
//   })
// })


// describe("Un Revisor", () =>{

//   it("con solo este rol, no puede asignar un artículo a otro revisor",()=>{
//     userFirst.add_role('Revisor');
//     regularSessionType.add_reviewer(userFifth); 
//     let invalideted = ()=>{userFifth.assign_article_to_reviewer(regularArticle, userFirst)};
//     expect(invalideted).toThrow();
//   })

//   it("expresa interés de un articulo solo si fue aceptado durante la etapa de recepción",()=>{
//     regularSessionType.add_reviewer(userSixth); 
//     let invalideted = ()=>{userSixth.send_bids(regularArticle, regularSessionType, 'Interesado');};
//     expect(invalideted).toThrow();
//   })

//   it("expresa 'interés' en un artículo",()=>{
//     regularSessionType.add_reviewer(userFourth); 
//     regularSessionType.add_article_to_list(regularArticle)

//     userFourth.send_bids(regularArticle, regularSessionType, 'Interesado');
//     expect(regularArticle.count_interesteds()).toEqual(1);
//   })

//   it("expresa 'no interés' en un artículo",()=>{
//     regularSessionType.add_reviewer(userFifth); 
//     regularSessionType.add_reviewer(userThird); 
//     regularSessionType.add_article_to_list(regularArticle)

//     userFifth.send_bids(regularArticle, regularSessionType, 'No interesado');
//     userThird.send_bids(regularArticle, regularSessionType, 'No interesado');
//     expect(regularArticle.count_not_interesteds()).toEqual(2);
//   })

//   it("expresa 'un quizás' en un artículo",()=>{
//     regularSessionType.add_reviewer(userThird); 
//     regularSessionType.add_reviewer(userFifth); 
//     regularSessionType.add_reviewer(userSixth);
//     regularSessionType.add_article_to_list(regularArticle)

//     userThird.send_bids(regularArticle, regularSessionType, 'Quizas');
//     userFifth.send_bids(regularArticle, regularSessionType, 'Quizas');
//     userSixth.send_bids(regularArticle, regularSessionType, 'Quizas');
//     expect(regularArticle.count_maybes()).toEqual(3);
//   })

//   it("puede cambiar de opinión respecto a un bid",()=>{
//     regularSessionType.add_reviewer(userThird); 
//     regularSessionType.add_reviewer(userFifth); 
//     regularSessionType.add_article_to_list(regularArticle)

//     userThird.send_bids(regularArticle, regularSessionType, 'Quizas');
//     userFifth.send_bids(regularArticle, regularSessionType, 'Quizas');
//     userFifth.send_bids(regularArticle, regularSessionType, 'Interesado');
//     expect(regularArticle.count_maybes()).toEqual(1);
//     expect(regularArticle.count_interesteds()).toEqual(1);
//   })

//   it("debe expresar 'Interesado, No interesado o Quizas'",()=>{
//     regularSessionType.add_reviewer(userThird);
//     regularSessionType.add_article_to_list(regularArticle)
 
//     let invalideted = ()=>{userThird.send_bids(regularArticle, regularSessionType, 'No podria')};
//     expect(invalideted).toThrow();
//   })

// })

// describe("Un Autor", () =>{
//   it("con solo este rol, no puede asignar un artículo a otro revisor",()=>{
//     userFirst.add_role('Autor');
//     regularSessionType.add_reviewer(userFifth); 
//     let invalideted = ()=>{ userFirst.assign_article_to_reviewer(regularArticle, userFifth)};
//     expect(invalideted).toThrow();
//   })
// })

// describe("Un Artículo", () =>{
//   it("puede tener varios revisores en la lista de pendiente de revisores",()=>{
//     userFirst.add_role('Chair');
//     regularSessionType.add_reviewer(userFifth); 
//     regularSessionType.add_reviewer(userFourth); 
//     userFirst.assign_article_to_reviewer(regularArticle, regularSessionType, userFifth); 
//     userFirst.assign_article_to_reviewer(regularArticle, regularSessionType, userFourth); 
//     expect(regularArticle.count_pending_reviewers()).toEqual(2);
//   })
// })