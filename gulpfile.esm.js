import { series, src, dest } from 'gulp'
import pug from 'gulp-pug'
import sass from 'gulp-sass'
import nodeSass from 'node-sass'
import babel from 'gulp-babel'

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

function transpileJs() {
  return src('src/js/**/*.js')
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(dest('build/js'))
}

export default series(transpileJs, buildStyles, buildHtml)
