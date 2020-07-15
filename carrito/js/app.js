// variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');



//listeners
cargarEventListeners();

function cargarEventListeners() {
   // dispara cuando se presiona agregar carrito
   cursos.addEventListener('click', comprarCurso);

   // cuando se elimina un curso del carrito
   carrito.addEventListener('click',eliminarCurso);

   // Al vaciar el carrito
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

// al cargar el documento, mostrar localstorage
document.addEventListener('DOMContentLoaded', leerLocalStorage);


}


// funciones
// function que añade el cruso al carrito
function comprarCurso(e) {
    e.preventDefault();
    //delegation para agregar carrito
    if(e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement; 
     // enviamos el curso seleccionado para tomar los datos    
        leerDatosCurso(curso);         
    }  
}
// leer datos del curso
function leerDatosCurso(curso) {
 const infoCurso = {
     imagen: curso.querySelector('img').src,
     titulo: curso.querySelector('h4').textContent,
     precio: curso.querySelector('.precio span').texContent,
     id: curso.querySelector('a').getAttribute('data-id')

   }
   insertarCarrito(infoCurso);

 }
  
// muestra el curso seleccionado en el carrito
function insertarCarrito(curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
         <td> 
               <img src="${curso.imagen}">

         </td>

         <td>${curso.titulo}</td>
         <td>${curso.precio}</td>
         <td> 
             <a href="#" class="borrar-curso" data-id="${curso.id}">x</a>   

         </td>
        
         `;
         listaCursos.appendChild(row);
         guardarCursoLocalStorage(curso);

}
//elimina el curso en el DOM
function eliminarCurso(e) {
    e.preventDefault();

    let curso,
    cursoid; 
    if(e.target.classList.contains('borrar-curso') ) {
          e.target.parentElement.parentElement.remove();
          curso = e.target.parentElement.parentElement;
          cursoId = curso.querySelector('a').getAttribute('data-id');
          
          
    }
    eliminarCursoLocalStorage(curso);



}
//elimina los cursos del carrito en el Dom
function vaciarCarrito() {
    // forma lenta
   //listaCursos.innerHTML = '';
   // forma rapida
while(listaCursos.firstChild) {
     listaCursos.removeChild(listaCursos.firstChild);

}
   
   //vaciar LOCALSTORAGE
   vaciarLocalStorage();

   return false;
   
}

// almacena cursos en el carrito a local storage

function guardarCursoLocalStorage(curso) {
    let cursos;
    //toma el valor de un arreglo con datos de ls o vacio
    cursos = obtenerCursosLocalStorage();

    // el curso seleccionado se agrega al arreglo
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos) );

}
// comprueba si algo en localStorage
function obtenerCursosLocalStorage() {
   let cursosLS;

   // compra si hay algo en localStorage
   if(localStorage.getItem('cursos') === null) {
      cursosLS = [];

    } else {
           cursosLS = JSON.parse( localStorage.getItem('cursos') );
    }
    return cursosLS;

}

//imprime los cursos de localstorage en el carrito

function leerLocalStorage() {
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(curso) {
        //construir el templete
        const row = document.createElement('tr');
        row.innerHTML = `
         <td> 
               <img src="${curso.imagen}">

         </td>

         <td>${curso.titulo}</td>
         <td>${curso.precio}</td>
         <td> 
             <a href="#" class="borrar-curso" data-id="${curso.id}">x</a>   

         </td>
        
         `;
         listaCursos.appendChild(row); 


    });

}

// elimana el curso por el ID storage

function eliminarCursoLocalStorage(curso) {
let cursosLS;

//Obtenemos el arreglo de cursos
cursosLS = obtenerCursosLocalStorage();
//Iteramos comparando al ID del Curso boorado con los del localstorage
cursosLS.forEach( function(cursoLS, index) {
    if(cursoLS.id === curso) {
    cursosLS.splice(index, 1);
}
    
});
// añandimos el arreglo actual a localStorage
localStorage.setItem('cursos', JSON.stringify(cursosLS) );
}

//Elimna todos los cursos del localstorage

function vaciarLocalStorage() {
    localStorage.clear();
    }