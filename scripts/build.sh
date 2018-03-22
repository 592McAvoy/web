#转换js
babel --presets react,es2015 js\source -d js\build
#打包js
browserify js\build\app.js -o bundle.js
#打包css
type css\components\* css\* > bundle.css
#完成
date;echo;