var gulp = require('gulp');
var foreach = require("gulp-foreach");
var zip = require("gulp-zip");
var del = require("del");


gulp.task("clean", function () {
  return del(['./zipped/*', './units/*']);
});

gulp.task("make-folders", ["clean"], function(){
  return gulp.src("./files/*.html")
      .pipe(foreach(function(stream, file){
         var fileName = file.path.substr(file.path.lastIndexOf("/")+1).split('.');
         gulp.src(["./files/"+fileName[0]+".html", "./files/"+fileName[0]+".js"])
             .pipe(gulp.dest("./units/"+fileName[0]))

         return stream;
      }));
})

gulp.task("copy-images", ["make-folders"], function(){
  return gulp.src("./files/*.html")
      .pipe(foreach(function(stream, file){
         var fileName = file.path.substr(file.path.lastIndexOf("/")+1).split('.');
         gulp.src(["./files/images/*"])
             .pipe(gulp.dest("./units/"+fileName[0]+"/images/"))

         return stream;
      }));

})

gulp.task("default", ["copy-images"], function(){
   return gulp.src("./files/*.html")
       .pipe(foreach(function(stream, file){
          var fileName = file.path.substr(file.path.lastIndexOf("/")+1).split('.');
          console.log(fileName[0]);
          gulp.src(["./units/"+fileName[0]+"/**/*"])
              .pipe(zip(fileName[0]+".zip"))
              .pipe(gulp.dest("./zipped"));

          return stream;
       }));
});
