const fs = require('fs');
const path = require('path');
const dir_path = __dirname;
let text_script =
    'const fs = require(\'fs\');\n'+
    'const path = require(\'path\');\n'+
    'const dir_path = __dirname;\n'+
    'function parser(dir_path){\n'+
    '    fs.readdir(dir_path, function(err, files) {\n'+
    '        for (let i = 0; i < files.length; i++) {\n'+
    '            analysis(dir_path + \'\\\\\' + files[i]);\n'+
    '        }\n'+
    '    })\n'+
    '}\n'+
    'function analysis(object_name){\n'+
    '    fs.stat(object_name, (err, stats)=> {\n'+
    '        if (stats.isDirectory()) {\n'+
    '            parser(object_name);\n'+
    '        }else{\n'+
    '            console.log(path.relative(dir_path, object_name));\n'+
    '        }\n'+
    '    })\n'+
    '}\n'+
    'parser(dir_path);\n';

function createFile(){
    let file_name = dir_path+'/summary.js';
    fs.writeFile(file_name, text_script, (err)=>{
        if(err){
            console.log('Error in creating file');
        }
    });
}
createFile();