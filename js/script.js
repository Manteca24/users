document.addEventListener('DOMContentLoaded', obtenerUsuarios);

/* hay que empezar a usar arrow functions siempre. Sería: 
const obtenerUsuarios = () => {
    (...)}
*/
function obtenerUsuarios() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(usuarios => {
            //console.log('Usuarios obtenidos:', usuarios); 
            const usuariosConDetalles = usuarios.map(usuario => {
                const edad = obtenerEdadAleatoria(20, 60);
                const img = `./assets/img/${usuario.id}.jpeg`;
                const { street, suite, city } = usuario.address;
                const direccion = `${street}, ${suite}, ${city}`;
                return {
                    ...usuario,
                    edad,
                    img,
                    direccion
                };
            });
            mostrarUsuarios(usuariosConDetalles);
            //console.log('Usuarios con detalles:', usuariosConDetalles); 
        })
        .catch(error => console.error('Error cargando usuarios.')); 
    }

function obtenerEdadAleatoria(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 

function mostrarUsuarios(usuarios) {
    const listaUsuarios = document.getElementById('listaUsuarios');
    usuarios.forEach(usuario => {
        const li = document.createElement('li');
        li.classList.add('usuario');
       /*Mucho más limpio usando destructuring aquí también. Sería:
       const {name, edad, username, img, phone, email, company (previo destructuring de usuario.company.name), direccion } = usuario;
       Y luego llamamos a las variables (ej: ${name}) */ 
        li.innerHTML = `
            <div class="detalles">
                <div class="basicos">
                <p><span>Nombre:</span> ${usuario.name}</p>
                <p><span>Edad:</span> ${usuario.edad}</p>
                <p><span>UserName:</span> ${usuario.username}</p>
                <p><span>Teléfono:</span> ${usuario.phone}</p>
                <p><span>Email:</span> ${usuario.email}</p>
                </div>
                <div class="compañia">
                <p><span>Compañía:</span> ${usuario.company.name}</p>
                <p><span>Dirección:</span> ${usuario.direccion}</p>
                </div>
            </div>
            <img src="${usuario.img}" alt="${usuario.name}" >
        `;
        listaUsuarios.appendChild(li);
    });
}
