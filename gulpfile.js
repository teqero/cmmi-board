'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');

build.tslintCmd.enabled = false;

build.initialize(gulp);
gulp.task('serve', gulp.series('serve-deprecated'));
