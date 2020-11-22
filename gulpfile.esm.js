import { series, src, dest } from 'gulp'
import pug from 'gulp-pug'

function buildHtml() {
  return src('src/pug/pages/**/*.pug')
    .pipe(pug())
    .pipe(dest('build'))
}

export default series(buildHtml)
