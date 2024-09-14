const FixedCutMethod = require('./FixedCutMethod');
const Article = require('./Article');

jest.mock('./Article'); 

let mockArticle1, mockArticle2, mockArticle3, mockArticle4; 

beforeEach(()=> {
  mockArticle1 = new Article('¿Por qué Fracasan los Proyectos de Software?; Un Enfoque Organizacional', 'https://courses.edx.org/asset-v1:MexicoX+UPEVIPN03x+T32015+type@asset+block/por_que_fallan_los_proy_de_soft.pdf');
  mockArticle2 = new Article('Uso de los dispositivos móviles en educación infantil', 'https://helvia.uco.es/bitstream/handle/10396/14212/Edmetic_vol_5_n_2_10.pdf?sequence=');
  mockArticle3 = new Article('Dispositivos móviles', 'https://d1wqtxts1xzle7.cloudfront.net/34258261/dispostivos_moviles_y_su_clasificacion-libre.pdf');
  mockArticle4 = new Article('EL RENDIMIENTO ESCOLAR. UNA ANÁLISIS DE LAS VARIABLES QUE LO CONDICIONAN', 'https://ruc.udc.es/dspace/bitstream/handle/2183/6952/?sequence=1');
});

test('se filtra articulos basado en el puntaje final', () => {
  let fixedCutMethod = new FixedCutMethod(50);
  mockArticle1.calculate_final_score;
  mockArticle1.final_score.mockReturnValue(9);
  mockArticle2.calculate_final_score;
  mockArticle2.final_score.mockReturnValue(-2);
  mockArticle3.calculate_final_score;
  mockArticle3.final_score.mockReturnValue(0);
  mockArticle4.calculate_final_score;
  mockArticle4.final_score.mockReturnValue(6);
  let articles = [mockArticle1, mockArticle2, mockArticle3, mockArticle4];
  const result = fixedCutMethod.select(articles);
  expect(result).toEqual([mockArticle1, mockArticle4]);
});


test('se filtra todos los articulos si el porcentaje es 100%', () => {
  const fixedCutMethod = new FixedCutMethod(100);
  mockArticle1.calculate_final_score;
  mockArticle1.final_score.mockReturnValue(9);
  mockArticle2.calculate_final_score;
  mockArticle2.final_score.mockReturnValue(-2);
  mockArticle3.calculate_final_score;
  mockArticle3.final_score.mockReturnValue(0);
  mockArticle4.calculate_final_score;
  mockArticle4.final_score.mockReturnValue(6);
  const articles = [mockArticle1, mockArticle2, mockArticle3, mockArticle4];
  const result = fixedCutMethod.select(articles);
  expect(result).toEqual([mockArticle1, mockArticle4, mockArticle3, mockArticle2]);
});

test('se filtra ningun articulo si el porcentaje es 0%', () => {
  const fixedCutMethod = new FixedCutMethod(0);
  mockArticle1.calculate_final_score;
  mockArticle1.final_score.mockReturnValue(9);
  mockArticle2.calculate_final_score;
  mockArticle2.final_score.mockReturnValue(-2);
  mockArticle3.calculate_final_score;
  mockArticle3.final_score.mockReturnValue(0);
  mockArticle4.calculate_final_score;
  mockArticle4.final_score.mockReturnValue(6);
  const articles = [mockArticle1, mockArticle2, mockArticle3, mockArticle4];
  const result = fixedCutMethod.select(articles);
  expect(result).toEqual([]);
});

test('debe manejar porcentajes mayores que 1 como números enteros', () => {
  const fixedCutMethod = new FixedCutMethod(50); // el 50 se convierte en 0.5
  mockArticle1.calculate_final_score;
  mockArticle1.final_score.mockReturnValue(9);
  mockArticle2.calculate_final_score;
  mockArticle2.final_score.mockReturnValue(-2);
  mockArticle3.calculate_final_score;
  mockArticle3.final_score.mockReturnValue(0);
  mockArticle4.calculate_final_score;
  mockArticle4.final_score.mockReturnValue(6);
  const articles = [mockArticle1, mockArticle2, mockArticle3, mockArticle4];
  const result = fixedCutMethod.select(articles);
  expect(result.length).toBe(2); // El 50% debe seleccionar 2 de 4 artículos
});


test('el número de articulo es par y el numero de porcentaje es impar entonces tomo el mayor valor (4*0.3 = 1.2 entonces es 2)', () => {
  let fixedCutMethod = new FixedCutMethod(30);
  mockArticle1.calculate_final_score;
  mockArticle1.final_score.mockReturnValue(9);
  mockArticle2.calculate_final_score;
  mockArticle2.final_score.mockReturnValue(-2);
  mockArticle3.calculate_final_score;
  mockArticle3.final_score.mockReturnValue(0);
  mockArticle4.calculate_final_score;
  mockArticle4.final_score.mockReturnValue(6);
  let articles = [mockArticle1, mockArticle2, mockArticle3, mockArticle4];
  const result = fixedCutMethod.select(articles);
  expect(result).toEqual([mockArticle1, mockArticle4]);
});

test('el número de articulo es par y el numero de porcentaje es impar entonces tomo el mayor valor (4*0.7 = 2.8 entonces es 3)', () => {
  let fixedCutMethod = new FixedCutMethod(70);
  mockArticle1.calculate_final_score;
  mockArticle1.final_score.mockReturnValue(9);
  mockArticle2.calculate_final_score;
  mockArticle2.final_score.mockReturnValue(-2);
  mockArticle3.calculate_final_score;
  mockArticle3.final_score.mockReturnValue(0);
  mockArticle4.calculate_final_score;
  mockArticle4.final_score.mockReturnValue(6);
  let articles = [mockArticle1, mockArticle2, mockArticle3, mockArticle4];
  const result = fixedCutMethod.select(articles);
  expect(result).toEqual([mockArticle1, mockArticle4, mockArticle3]);
});