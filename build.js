// Run 'node build.js' to list all examples in index.html

const fs = require('fs');
const path = require('path');
const unslug = require('unslug');

const base = './';

// credit: https://stackoverflow.com/a/24594123/1227747
function getDirectories (srcpath) {
  return fs.readdirSync(srcpath)
    .filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory() && file != '.git' && file != 'node_modules')
}

var exDirs = getDirectories(base);
var refs = '';

exDirs.forEach(function (dir) {
  refs += '<a href="' + base + dir + '">' + unslug(dir) + '</a> \n';
});

fs.readFile(base + 'tmpl-index.html', 'utf8', function (err, content) {

  fs.writeFile(base + 'index.html', content.replace('<EXAMPLES-HERE>', refs), (err) => {
    if(!err) {
      console.log('Examples listed in index.html');
    } else {
      console.log(err);
    }
  })

});
