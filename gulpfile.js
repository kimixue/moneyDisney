var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var inline = require('gulp-inline');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var replace = require('gulp-replace');



// 预览对应得方法

gulp.task('help',function(){
	
});

gulp.task('replace', function(){
	gulp.src(['dist/index.html','dist/app.html'])
		.pipe(replace(/..\/img\/app\//g,''))
		.pipe(replace(/img\/app\//g,''))
		.pipe(replace(/..\/img\/web\//g,''))
		.pipe(replace(/img\/web\//g,''))
		.pipe(gulp.dest('dist/'));
});

gulp.task('inline',function(){
	gulp.src(['webapp/index.html','webapp/app.html'])
		.pipe(inline({
			base: 'webapp/',
			//js: uglify,
			//css: minifyCss,
			disabledTypes: ['svg', 'img'],
			ignore: ['./css/do-not-inline-me.css']
		}))
		.pipe(gulp.dest('dist/'));

});
gulp.task('sass', function () {
  	return gulp.src('webapp/sass/**/*.scss')
	    .pipe(sass.sync().on('error', sass.logError))
	    .pipe(gulp.dest('webapp/css'));
});


gulp.task('sass:watch', function () {
	gulp.watch('webapp/sass/**/*.scss', ['sass']);
});


gulp.task('serve',['sass'],function() {
    browserSync.init({
        server: 'webapp/'
    });
    connect.server({
    	port:8010
    });

    watch(['webapp/index.html','webapp/app.html']).on('change', browserSync.reload);
    watch(['webapp/js/*.js']).on('change', browserSync.reload);
    watch(['webapp/sass/*.scss']).on('change', browserSync.reload);
});



gulp.task('default',['serve','sass:watch']);
gulp.task('bulid',['inline']);