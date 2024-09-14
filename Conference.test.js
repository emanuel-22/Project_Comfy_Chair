const Conference = require('./Conference');
const Session = require('./Session');
const RegularSession = require('./RegularSession');
const PosterSession = require('./PosterSession');
const WorkshopSession = require('./WorkshopSession');
const User = require('./User');

let conference, sessionRegular, sessionSecond, sessionPoster, sessionWorkshop, userFirst;

//jest.mock('./User');

beforeEach( ()=> {
  // Usamos la fecha actual como fecha de recepción
  timestamp = Date.now();
  date = new Date(timestamp);
  deadline = date.toISOString().split('T')[0];
  conference = new Conference('CACIC', '2024-06-15', '09:00', '2024-06-19', '18:00');
  sessionRegular = new Session('Agentes y Sistemas Inteligentes', new RegularSession(), deadline);
  sessionSecond = new Session('Arquitectura, Redes y Sistemas Operativos', new RegularSession(), deadline);
  sessionPoster = new Session('Agentes y Sistemas Inteligentes', new PosterSession(), deadline);
  sessionWorkshop = new Session('Agentes y Sistemas Inteligentes', new WorkshopSession(), deadline);
  userFirst = new User('Martinez', 'Julio', 'UBA', 'martinezjulio@gmail.com', 'asdasd');
});

describe("Una conferencia ", ()=>{

  it("puede tener varias sesiones",()=>{
    conference.add_session('Agentes y Sistemas Inteligentes', 'Sesion Regular', deadline);
    conference.add_session('Arquitectura, Redes y Sistemas Operativos', 'Sesion Regular', deadline);
    expect(conference.sessions()).toContainEqual(sessionRegular);
    expect(conference.sessions()).toContainEqual(sessionSecond);
  })

  it("permite crear una Sesión Regular",()=>{
    conference.add_session('Agentes y Sistemas Inteligentes', 'Sesion Regular', deadline);
    expect(conference.sessions()).toContainEqual(sessionRegular);
  })

  it("permite crear una Sesión Poster",()=>{
    conference.add_session('Agentes y Sistemas Inteligentes', 'Sesion Poster', deadline);
    expect(conference.sessions()).toContainEqual(sessionPoster);
  })

  it("permite crear una Sesión Workshop",()=>{
    conference.add_session('Agentes y Sistemas Inteligentes', 'Sesion Workshop', deadline);
    expect(conference.sessions()).toContainEqual(sessionWorkshop);
  })

  it("se verifica que se cargó una sesión de forma correcta",()=>{
    conference.add_session('Agentes y Sistemas Inteligentes', 'Sesion Poster', deadline);
    expect(conference.has_session('Agentes y Sistemas Inteligentes', 'Sesion Poster')).toBe(true);
  })

  it("no se puede crear una session de otro tipo que no sea regular, poster, workshop",()=>{
    expect(() => {
      conference.add_session('Agentes y Sistemas Inteligentes', 'Otra Sesion', deadline);
    }).toThrow();
  })

  it("no se puede crear la misma sesión con el mismo nombre y tipo de sesión",()=>{
    conference.add_session('Agentes y Sistemas Inteligentes', 'Sesion Regular', deadline);
    let duplicated_session = () => {conference.add_session('Agentes y Sistemas Inteligentes', 'Sesion Regular', deadline)};
    expect(duplicated_session).toThrow();
  })

  it("evitar el mismo usuario 2 veces a la lista de chairs",()=>{
    conference.add_chairs(userFirst)
    let duplicated_user = ()=>{conference.add_chairs(userFirst)};
    expect(duplicated_user).toThrow();
  })

  it("cuando se agrega un usuario a la lista de chairs, se debe agregar el rol de Chair",()=>{
    conference.add_chairs(userFirst)
    expect(userFirst.has_role('Chair')).toBe(true);
  })

  it("evitar agregar el mismo usuario 2 veces al comité de programa",()=>{
    conference.add_program_committee(userFirst)
    let duplicated_user = ()=>{conference.add_program_committee(userFirst)};
    expect(duplicated_user).toThrow();
  })

  it("cuando se agrega un usuario al comité de programa, se debe agregar el rol de Revisor",()=>{
    conference.add_program_committee(userFirst)
    expect(userFirst.has_role('Revisor')).toBe(true);
  })
})

