import { src, dest, series } from 'gulp';
import gulpClean from 'gulp-clean';
import {nunjucksCompile} from 'gulp-nunjucks';
import data from 'gulp-data';
import siteData from './data.json' with { type: 'json' }; 

const copyJSFiles = (cb) => {
  return src([
      'src/js/*.js',
      'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
    ])
    .pipe(dest('build/js'));
};

const nunjucksFiles = (cb) => {
  return src('src/index.njk')
    .pipe(data(() => siteData))
		.pipe(nunjucksCompile())
		.pipe(dest('build'));
};

const clean = (cb) => {
  return src('build/*', {read: false})
    .pipe(gulpClean());
}

export default series(clean, copyJSFiles, nunjucksFiles);

//exports.default = defaultTask