const crypto = require('crypto');
const roles = ['Chair', 'Autor', 'Revisor'];
const query = 'software';  
count = 0;

fetch(`https://api.crossref.org/works?query=${query}&rows=500`)
    .then(response => response.json())
    .then(data => {
        data.message.items.forEach(item => {
          const authors = item.author || [];
          if (authors){
            authors.forEach(author => {
              if (author.affiliation && Array.isArray(author.affiliation) && author.affiliation.length > 0) {
                const numRoles = Math.floor(Math.random() * 3) + 1; 
                const shuffledRoles = roles.sort(() => 0.5 - Math.random());
                const selectedRoles = shuffledRoles.slice(0, numRoles);
                const email_name = `${author.family || ''}`.toLowerCase().trim().replace(/\s+/g, ' ');
                const password =  crypto.randomBytes(12).toString('base64').slice(0, 12);
                console.log(` --------------------${count}---------------------------------`);
                console.log('- Nombre:');
                console.log(` ${author.given}`);
                console.log('- Apellido:');
                console.log(` ${author.family}`);
               
                console.log('- Afiliacion:');
                console.log(`${author.affiliation[0].name}`);
                console.log('- Email:');
                console.log(` ${email_name}@gmail.com`);
                console.log('- Contraseña:');
                console.log(` ${password}`);
                console.log('- Roles:');
                console.log(`${selectedRoles}`);
                count=count+1;
              }
            });
            
          }
        });
    }).catch(error => console.error('Error:', error));

    console.log(` Cantidad de investigadores encontrados: ${count}`);
