import { src, dest, series } from 'gulp';
import gulpClean from 'gulp-clean';
import { nunjucksCompile } from 'gulp-nunjucks';
import data from 'gulp-data';
import less from 'gulp-less';
import siteData from './data.json' with { type: 'json' };

const inputDir = 'src';
const outputDir = 'dist';

const copyJSFiles = (cb) => {
  return src([
    'src/js/*.js',
    'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
  ])
    .pipe(dest(`${outputDir}/js`));
};

const copyCSSFiles = (cb) => {
  return src([
    'node_modules/bootstrap/dist/css/bootstrap.min.css'
  ])
    .pipe(dest(`${outputDir}/css`));
};

const nunjucksFiles = (cb) => {
  return src(`${inputDir}/*.njk`)
    .pipe(data(() => siteData))
    .pipe(nunjucksCompile())
    .pipe(dest(outputDir));
};

const lessFiles = (cb) => {
  return src('src/css/*.less')
    .pipe(less())
    .pipe(dest(`${outputDir}/css`));
};

const clean = (cb) => {
  return src(`${outputDir}/*`, { read: false })
    .pipe(gulpClean());
}

export default series(clean, copyJSFiles, copyCSSFiles, nunjucksFiles, lessFiles);

//exports.default = defaultTask