const { src, dest, watch, parallel } = require("gulp"); // Extrae toda la funcionalidad de gulp. src sirve para identificar el archivo y dest para guardarlo

//CSS
const sass = require("gulp-sass")(require('sass')); // Importa el paquete sass
const plumber = require("gulp-plumber"); // Importa plumber

//Para mejorar el código css y minificarlo:
const autoprefixer = require("autoprefixer"); // Importa autoprefixer
const cssnano = require("cssnano"); // Importa cssnano
const postcss = require("gulp-postcss"); // Importa postcss
const sourcemaps = require("gulp-sourcemaps"); // Importa sourcemaps


//IMÁGENES
const cache = require( "gulp-cache" );
const imagemin = require( "gulp-imagemin" );
const webp = require( "gulp-webp" );
const avif = require( "gulp-avif" );

//JAVASCRIPT
const terser = require("gulp-terser-js"); // Importa el compresor de javascript terser-js, que lo minificará también
 


function css(done) {

    src('src/scss/**/*.scss') //Primer paso: Identificar el archivo SASS. Con los asteriscos, reflejará los cambios que se hagan en todos los docuemtnos
        .pipe( sourcemaps.init() )
        .pipe( plumber() )
        .pipe(sass())  //Compilarlo
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe( sourcemaps.write('.') )
        .pipe(dest("build/css")); //Almacenarla en el disco duro

    done(); //Callback que avisa a gulp cuando llegamos al final de esta función
}

// Función para convertir imágenes a jpg minificadas
function imagenes(done) {

    const opciones = {
        optimizationLevel: 3
    };

    src('src/img/**/*.{png,jpg}')
        .pipe(cache( imagemin(opciones) ))
        .pipe(dest('build/img'))
    done();
}

// Función para convertir imágenes a formato webp
function versionWebp( done ) {

    const opciones = {
        quality:50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))

    done();
};

// Función para convertir imágenes a formato avif

function versionAvif( done ) {

    const opciones = {
        quality:50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))

    done();
};

function javascript(done) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init()) //Lo mismo que con el css, se crea sourcemaps para que sea más fácil identificar si hay que cambiar algo
        .pipe( terser() )
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));

    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);

    done();
}

exports.css = css; //Así se manda a llamar a la función css
exports.js = javascript; //Así se manda a llamar a la función js
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif, javascript, dev ); // //Así se manda a llamar a la función versionWebp y dev, para que cada vez que haga un cambio, se ejecute