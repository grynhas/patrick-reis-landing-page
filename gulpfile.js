'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'))
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

// Sass Source
var scssFiles = './src/sass/style.scss';

// CSS destination
const cssDest = './src/css';

//Css autoprefixer final file
const cssAutoprefixer = '.dist/css/style.css';

// Options for development
var sassDevOptions = {
    outputStyle: 'expanded'
  }
  
  // Options for production
  var sassProdOptions = {
    outputStyle: 'compressed'
  }

gulp.task('default', compileSass);
gulp.task('autoprefixerCss', autoprefixerCss);

let autoprefixBrowsers = ['> 0.5%', 'last 10 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 6','IE 7','IE 8', 'IE 9', 'IE 10', 'IE 11'];

function compileSass() {
    console.log('Compiling Sass...')
    return gulp
        .src(scssFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssDest));
}

function autoprefixerCss() {
    console.log('Autoprefixing CSS...')
    return gulp
        .src(`./src/css/style.css`)
		.pipe(autoprefixer({
            overrideBrowserslist: autoprefixBrowsers,
            flexbox: 'no-2009'
        }))
        .pipe(sass(sassProdOptions).on('error', sass.logError))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./dist/css'));
}

gulp.task('watch', function() {
    gulp.watch('./src/sass/*.scss', gulp.series('default'));
});