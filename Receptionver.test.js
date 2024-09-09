const Session = require('./Session');
const RegularSession = require('./RegularSession');
const WorkshopSession = require('./WorkshopSession');
const PosterSession = require('./PosterSession');

const User = require('./User');
const RegularArticle = require('./RegularArticle');
const Poster = require('./Poster');


let regularSessionType, workshopSessionType, posterSessionType;

beforeEach( ()=> {
  timestamp = Date.now();
  date = new Date(timestamp);
  deadline = date.toISOString().split('T')[0]; //2024-08-24
  shippingDate = date.toISOString().split('T')[0];

  dateOther = new Date('2024-11-13');
  lateDate = dateOther.toISOString().split('T')[0]; //2024-11-13
   
  userFirst = new User('Emanuel', 'Barboza', 'UNSa', 'emanuel@gmail.com', 'asdasd');
  userFirst.add_role('Autor');

  userSecond = new User('Daniel', 'Benvidez', 'UNCU', 'danimelli@gmail.com', 'asdasd');

  //-------------------------------- Articulos Regulares----------------------------------------
  regularArticle = new RegularArticle(
    'IT Project Failures, Causes and Cures', 
    'https://refactoring.guru/design-patterns/state',
    'Despite decades of research, IT projects continue to experience high failure rates, often attributed to poor project management, cost estimation, and requirements gathering. However, simply identifying these causes is insufficient to prevent them. This study adopts an aviation-inspired accident investigation approach to explore the root causes of IT project failures. Through a forensic analysis of five large government IT projects in Denmark, we uncovered 37 root causes and 22 potential cures. Notably, only one cause was programming-related, and each project suffered from around 15 causes. Moreover, 27 of the identified causes are not reported in existing research literature, highlighting the importance of this study. The findings provide valuable insights for educators, policymakers, and practitioners, informing the development of targeted interventions to prevent IT project failures. By understanding the underlying causes, we can develop effective strategies to mitigate them, ultimately improving the success rates of IT projects.'
  );

  regularArticleInvalidated = new RegularArticle(
    'IT Project Failures, Causes and Cures', 
    'https://refactoring.guru/design-patterns/state',
    'Despite decades of research, IT projects continue to experience high failure rates, often attributed to poor project management, cost estimation, and requirements gathering. However, simply identifying these causes is insufficient to prevent them. This study adopts an aviation-inspired accident investigation approach to explore the root causes of IT project failures. Through a forensic analysis of five large government IT projects in Denmark, we uncovered 37 root causes and 22 potential cures. Notably, only one cause was programming-related, and each project suffered from around 15 causes. Moreover, 27 of the identified causes are not reported in existing research literature, highlighting the importance of this study. The findings provide valuable insights for educators, policymakers, and practitioners, informing the development of targeted interventions to prevent IT project failures. By understanding the underlying causes, we can develop effective strategies to mitigate them, ultimately improving the success rates of IT projects. '+
    'Despite decades of research, IT projects continue to experience high failure rates, often attributed to poor project management, cost estimation, and requirements gathering. However, simply identifying these causes is insufficient to prevent them. This study adopts an aviation-inspired accident investigation approach to explore the root causes of IT project failures. Through a forensic analysis of five large government IT projects in Denmark, we uncovered 37 root causes and 22 potential cures. Notably, only one cause was programming-related, and each project suffered from around 15 causes. Moreover, 27 of the identified causes are not reported in existing research literature, highlighting the importance of this study. The findings provide valuable insights for educators, policymakers, and practitioners, informing the development of targeted interventions to prevent IT project failures. By understanding the underlying causes, we can develop effective strategies to mitigate them, ultimately improving the success rates of IT projects. Despite decades of research, IT projects continue to experience high failure rates, often attributed to poor project management, cost estimation, and requirements gathering. However, simply identifying these causes is insufficient to prevent them. This study adopts an aviation-inspired accident investigation approach to explore the root causes of IT project failures. Through a forensic analysis of five large government IT projects in Denmark, we uncovered 37 root causes and 22 potential cures. Notably, only one cause was programming-related, and each project suffered from around 15 causes'
  );

  regularArticleInvalidated2 = new RegularArticle(
    '', 
    'https://refactoring.guru/design-patterns/state',
    'Despite decades of research, IT projects continue to experience high failure rates, often attributed to poor project management, cost estimation, and requirements gathering. However, simply identifying these causes is insufficient to prevent them. This study adopts an aviation-inspired accident investigation approach to explore the root causes of IT project failures. Through a forensic analysis of five large government IT projects in Denmark, we uncovered 37 root causes and 22 potential cures. Notably, only one cause was programming-related, and each project suffered from around 15 causes. Moreover, 27 of the identified causes are not reported in existing research literature, highlighting the importance of this study. The findings provide valuable insights for educators, policymakers, and practitioners, informing the development of targeted interventions to prevent IT project failures. By understanding the underlying causes, we can develop effective strategies to mitigate them, ultimately improving the success rates of IT projects. '
  );

  //-------------------------------- Articulos Poster----------------------------------------
  posterArticle = new Poster(
    'Implementacion de metodologia agil a organizaciones no gubernamentales', 
    'https://refactoring.guru/design-patterns/state',
    'https://refactoring.guru/design-patterns/state'
  );

  posterInvalidated = new Poster(
    '', 
    'https://refactoring.guru/design-patterns/state',
    'https://refactoring.guru/design-patterns/state'
  );

  regularSessionType = new Session('Agentes y Sistemas Inteligentes', new RegularSession(), deadline);
  workshopSessionType = new Session('Agentes y Sistemas Inteligentes', new WorkshopSession(), deadline);
  posterSessionType = new Session('Agentes y Sistemas Inteligentes', new PosterSession(), deadline);

});



describe("En la etapa de recepción", ()=>{
  it("un autor, puede enviar un articulo a una session",()=>{
    regularArticle.add_author(userFirst)
    userFirst.send_article(regularArticle, regularSessionType, shippingDate)
    expect(regularSessionType.has_article(regularArticle)).toBe(true);
  })

  it("un usuario solo con rol revisor y chair, no puede enviar un articulo a una session",()=>{
    userSecond.add_role('Revisor');
    userSecond.add_role('Chair');
    let invalidate_function = ()=>{userSecond.send_article(regularArticle, regularSessionType, shippingDate)};
    expect(invalidate_function).toThrow();
  })

  it("la fecha de envío de un articulo debe ser menor a la fecha de deadline de la session",()=>{
    regularArticle.add_author(userFirst);
    let invalidet_article = ()=>{regularSessionType.receive_article(regularArticle, userFirst, lateDate)};
    expect(invalidet_article).toThrow();
  })
})

