const Conference = require('./Conference');
const Session = require('./Session');
const RegularSession = require('./RegularSession');
const PosterSession = require('./PosterSession');
const WorkshopSession = require('./WorkshopSession');

let conference,session_regular, session_poster, session_workshop;


beforeEach( ()=> {
  conference = new Conference('CACIC', '2024-06-15', '09:00', '2024-06-19', '18:00');
  session_regular = new Session('Agentes y Sistemas Inteligentes', new RegularSession());
  session_poster = new Session('Agentes y Sistemas Inteligentes', new PosterSession());
  session_workshop = new Session('Agentes y Sistemas Inteligentes', new WorkshopSession());
});

describe("Una conferencia ", ()=>{
  it("puede tener varias sesiones",()=>{
    expect(() => {
      conference.add_session('Agentes y Sistemas Inteligentes', 'Sesion Regular');
      conference.add_session('Arquitectura, Redes y Sistemas Operativos', 'Sesion Regular');
    }).not.toThrow();
  })

  it("puede crear una session regular",()=>{
    conference.add_session('Agentes y Sistemas Inteligentes', 'Sesion Regular');
    expect(conference.sessions()).toContainEqual(session_regular);
  })

  it("puede crear una session poster",()=>{
    conference.add_session('Agentes y Sistemas Inteligentes', 'Sesion Poster');
    expect(conference.sessions()).toContainEqual(session_poster);
  })

  it("puede crear una session workshop",()=>{
    conference.add_session('Agentes y Sistemas Inteligentes', 'Sesion Workshop');
    expect(conference.sessions()).toContainEqual(session_workshop);
  })

  it("no puede crear una session de tipo regular dos veces",()=>{
    expect(() => {
      conference.add_session('Agentes y Sistemas Inteligentes', 'Sesion Regular');
      conference.add_session('Agentes y Sistemas Inteligentes', 'Sesion Regular');
    }).toThrow();
  })

  it("no puede crear una session de otro tipo que no sea regular, poster, workshop",()=>{
    expect(() => {
      conference.add_session('Agentes y Sistemas Inteligentes', 'Otra Sesion');
    }).toThrow();
  })
})

