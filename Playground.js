

const RegularArticle = require('./RegularArticle');
const Poster = require('./Poster');
const Chair = require('./Chair');
const RegularSession = require('./RegularSession');
const Session = require('./Session');

// const chair = new Chair(1, 'Barboza', 'Emanuel', 'UNSa', 'emanuelbarboza5@gmail.com', 'asdasd')

// const conference = chair.create_conference('CACIC', '2024-06-15', '09:00', '2024-06-19', '18:00');
regularSession = new RegularSession();
regular_session = new Session('Agentes y Sistemas Inteligentes', regularSession);

console.log(regular_session.type_session());
