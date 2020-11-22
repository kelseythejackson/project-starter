import { series, src, dest } from 'gulp'
import pug from 'gulp-pug'
import sass from 'gulp-sass'
import nodeSass from 'node-sass'

sass.compiler = nodeSass

function buildHtml() {
  return src('src/pug/pages/**/*.pug')
    .pipe(pug())
    .pipe(dest('build'))
}

function buildStyles() {
  return src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('build/css'))
}

export default series(buildStyles, buildHtml)
