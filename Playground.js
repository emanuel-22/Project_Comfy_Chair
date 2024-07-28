

const RegularArticle = require('./RegularArticle');
const Poster = require('./Poster');

const Chair = require('./Chair');


const chair = new Chair(1, 'Barboza', 'Emanuel', 'UNSa', 'emanuelbarboza5@gmail.com', 'asdasd')

const conference = chair.create_conference('CACIC', '2024-06-15', '09:00', '2024-06-19', '18:00');

console.log(conference.name());
