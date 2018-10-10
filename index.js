const fs = require('fs');
const path = require('path');
const dir_path = process.argv[2];
let new_dir_path;
let text_script =
    'const fs = require(\'fs\');\r\n'+
    'const path = require(\'path\');\r\n'+
    'const dir_path = __dirname;\r\n'+
    'function parser(dir_path){\r\n'+
    '    fs.readdir(dir_path, function(err, files) {\r\n'+
    '        for (let i = 0; i < files.length; i++) {\r\n'+
    '            analysis(dir_path + \'\\\\\' + files[i]);\r\n'+
    '        }\r\n'+
    '    })\r\n'+
    '}\r\n'+
    'function analysis(object_name){\r\n'+
    '    fs.stat(object_name, (err, stats)=> {\r\n'+
    '        if (stats.isDirectory()) {\r\n'+
    '            parser(object_name);\r\n'+
    '        }else{\r\n'+
    '            console.log(path.relative(dir_path, object_name));\r\n'+
    '        }\r\n'+
    '    })\r\n'+
    '}\r\n'+
    'parser(dir_path);\r\n';

function accessFile() {
    fs.access(dir_path,(err)=>{
        if(err){
            console.log('Error in dir path');
        }
        else{
            createFile();
            copyFile();

        }
    });
}
function createFile(){
    let file_name = dir_path+'/summary.js';
    fs.writeFile(file_name, text_script, (err)=>{
        if(err){
            console.log('Error in creating file');
        }
    });
}

function createDir(){
    new_dir_path = dir_path+'\\'+path.basename(dir_path);
    fs.access(new_dir_path, (err) => {
        if (!err) {
            console.log('Error in dir path');
        }
        else{
            fs.mkdir(new_dir_path,(err)=>{
                if (err) {
                    console.log(err);
                }
            });
        }
    });
}

accessFile();