import { series, src, dest, watch } from 'gulp'
import pug from 'gulp-pug'
import sass from 'gulp-sass'
import nodeSass from 'node-sass'
import babel from 'gulp-babel'
import bs from 'browser-sync'

const browserSync = bs.create()
sass.compiler = nodeSass

function buildHtml() {
  return src('src/pug/pages/**/*.pug')
    .pipe(pug())
    .pipe(dest('build'))
    .pipe(browserSync.stream())
}

function buildStyles() {
  return src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('build/css'))
    .pipe(browserSync.stream())
}

function transpileJs() {
  return src('src/js/**/*.js')
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(dest('build/js'))
    .pipe(browserSync.stream())
}

function server() {
  browserSync.init({
    server: {
      baseDir: 'build'
    }
  })
  watch('src/pug/pages/**/*.pug', buildHtml)
  watch('src/scss/**/*.scss', buildStyles)
  watch('src/js/**/*.js', transpileJs)
}

export const build = series(
  transpileJs,
  buildStyles,
  buildHtml
)
export default series(build, server)
