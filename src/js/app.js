document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function() {

        if ( sobreFestival.getBoundingClientRect().top < 0 ) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    })
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a'); //Selecciona todos los enlaces

    enlaces.forEach( enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault(); //Paraliza el comportamiento por defecto que es que te lleve de golpe sin hacer scroll

            const seccionScroll = e.target.attributes.href.value; //Almacenará en la variable el valor del atributo href del enlace
            const seccion = document.querySelector(seccionScroll); 
            seccion.scrollIntoView({ behavior: "smooth" });
        })
    });
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes'); //Selecciona la clase .galeria-imagenes

    for (let i = 1; i<=12; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width"200" height="300" src="build/thumb/img/${i}.jpg" alt="imagen galería">
        `;

        imagen.onclick = function() {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id) {
    const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width"200" height="300" src="build/grande/img/${id}.jpg" alt="imagen galería">
        `;

        //Crea el overlay con la imagen
        const overlay = document.createElement('DIV');
        overlay.appendChild(imagen);
        overlay.classList.add('overlay');

        //para que se cierre la foto al pulsar en cualquier parte de la pantalla (no solo en la X)
        overlay.onclick = function() {
            const body = document.querySelector('body'); //Selecciona el body
            body.classList.remove('fijar-body'); //Elimina la clase cuando le de al botón cerrar
            overlay.remove();
        }

        //Botón para cerrar la imagen
        const cerrarFoto = document.createElement('P');
        cerrarFoto.textContent = 'X';
        cerrarFoto.classList.add('btn-cerrar');
        cerrarFoto.onclick = function() {
            const body = document.querySelector('body'); //Selecciona el body
            body.classList.remove('fijar-body'); //Elimina la clase cuando le de al botón cerrar
            overlay.remove();
        }
        overlay.appendChild(cerrarFoto);

        //Añade el overlay al html
        const body = document.querySelector('body'); //Selecciona el body
        body.appendChild(overlay); //Añade el overlay creado al body
        body.classList.add('fijar-body'); //Añade la clase fijar-body al body 
}