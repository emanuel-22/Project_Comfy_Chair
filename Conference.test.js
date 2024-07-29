const Conference = require('./Conference');
const Session = require('./Session');

let conference;
let session1;
let session2;
let session3;
let session4;

beforeEach( ()=> {
  conference = new Conference('CACIC', '2024-06-15', '09:00', '2024-06-19', '18:00');
  session1 = new Session('Agentes y Sistemas Inteligentes');
  session2 = new Session('Arquitectura, Redes y Sistemas Operativos');
  session3 = new Session('Computación Gráfica, Imágenes y Visualización');
  session4 = new Session('Ingeniería de Software');
});

describe("Una conferencia ", ()=>{
  it("puede tener varias sesiones",()=>{
    conference.add_session(session1);
    conference.add_session(session2);
    conference.add_session(session3);
    conference.add_session(session4);
    expect(conference.sessions()).toEqual([session1,session2,session3,session4]);
  })
})