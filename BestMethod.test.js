const BestMethod = require('./BestMethod');
const Article = require('./Article');

jest.mock('./Article'); 

let mockArticle1, mockArticle2, mockArticle3; 

beforeEach(()=> {
  mockArticle1 = new Article('¿Por qué Fracasan los Proyectos de Software?; Un Enfoque Organizacional', 'https://courses.edx.org/asset-v1:MexicoX+UPEVIPN03x+T32015+type@asset+block/por_que_fallan_los_proy_de_soft.pdf');
  mockArticle2 = new Article('Uso de los dispositivos móviles en educación infantil', 'https://helvia.uco.es/bitstream/handle/10396/14212/Edmetic_vol_5_n_2_10.pdf?sequence=');
  mockArticle3 = new Article('Dispositivos móviles', 'https://d1wqtxts1xzle7.cloudfront.net/34258261/dispostivos_moviles_y_su_clasificacion-libre.pdf');
});

test('se filtra articulos basado en el puntaje final', () => {
  let bestMethod = new BestMethod(3);
  mockArticle1.calculate_final_score;
  mockArticle1.final_score.mockReturnValue(2);
  mockArticle2.calculate_final_score;
  mockArticle2.final_score.mockReturnValue(4);
  mockArticle3.calculate_final_score;
  mockArticle3.final_score.mockReturnValue(5);
  let articles = [mockArticle1, mockArticle2, mockArticle3];
  let selectedArticles = bestMethod.select(articles);
  expect(mockArticle1.calculate_final_score).toHaveBeenCalled();
  expect(mockArticle2.calculate_final_score).toHaveBeenCalled();
  expect(mockArticle3.calculate_final_score).toHaveBeenCalled();
  expect(selectedArticles).toEqual([mockArticle2, mockArticle3]);
});

test('se devuelve vacio si la lista de articulos esta vacia', () => {
  let bestMethod = new BestMethod(3);
  let articles = [];
  let selectedArticles = bestMethod.select(articles);
  expect(selectedArticles).toEqual([]);
});

test('se seleccionan todos los artículos si el límite es bajo', () => {
  let bestMethod = new BestMethod(1);
  mockArticle1.calculate_final_score;
  mockArticle1.final_score.mockReturnValue(2);
  mockArticle2.calculate_final_score;
  mockArticle2.final_score.mockReturnValue(4);
  let articles = [mockArticle1, mockArticle2];
  let selectedArticles = bestMethod.select(articles);
  expect(selectedArticles).toEqual([mockArticle1, mockArticle2]);
});