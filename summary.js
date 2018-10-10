const fs = require('fs');
const path = require('path');
const dir_path = __dirname;
function parser(dir_path){
    fs.readdir(dir_path, function(err, files) {
        for (let i = 0; i < files.length; i++) {
            analysis(dir_path + '\\' + files[i]);
        }
    })
}
function analysis(object_name){
    fs.stat(object_name, (err, stats)=> {
        if (stats.isDirectory()) {
            parser(object_name);
        }else{
            console.log(path.relative(dir_path, object_name));
        }
    })
}
parser(dir_path);
