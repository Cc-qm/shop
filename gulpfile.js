/*
 * @Author: cai 
 * @Date: 2020-03-01 12:28:44 
 * @Last Modified by: cai
 * @Last Modified time: 2020-03-01 14:35:32
 */

//导入各个模块
const gulp = require("gulp");
const cssmin = require("gulp-cssmin");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const htmlmin = require("gulp-htmlmin");
const del = require("del");
const webserver = require("gulp-webserver");

//定义 打包压缩各个文件 的函数
const cssHandler = () => {
    return gulp.src("./src/css/*.css")
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(gulp.dest("./dist/css"));
}

const jsHandler = () => {
    return gulp.src("./src/js/*.js")
        .pipe(babel({
            presets: ["@babel/env"]
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"));
}

const htmlHandler = () => {
    return gulp.src("./src/pages/*.html")
        .pipe(htmlmin({
            removeAttributeQuotes: true, //移除属性上的双引号
            removeComments: true, //移除注释
            collapseBooleanAttributes: true, //把布尔值属性简写
            collapseWhitespace: true, //移除所有的空格
            minifyCSS: true, //压缩内联的css代码
            minifyJS: true //压缩script标签里面的js代码
        }))
        .pipe(gulp.dest("./dist/pages"));
}

const imaHandler = () => {
    return gulp.src("./src/images/**")
        .pipe(gulp.dest("./dist/images"));
}

const libHandler = () => {
    return gulp.src("./src/lib/**").pipe(gulp.dest("./dist/lib"));
};

const delHandler = () => {
    return del(["./dist"]);
}

const serverHandler = () => {
    return gulp.src("./dist")
        .pipe(webserver({
            host: "localhost",
            port: 8080,
            open: "./pages/index.html",
            livereload: true,
        }))
}

const watchHandler = () => {
    gulp.watch("./src/css/*.css", cssHandler);
    gulp.watch("./src/js/*.js", jsHandler);
    gulp.watch("./src/pages/*.html", htmlHandler);
    gulp.watch("./src/lib/**", libHandler);
    gulp.watch("./src/images/**", imaHandler);
}

module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(cssHandler, jsHandler, htmlHandler, imaHandler, libHandler),
    serverHandler,
    watchHandler
)