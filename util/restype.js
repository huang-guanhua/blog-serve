const fs = require('fs');
const path = require('path');

exports.contentTypeinfo = function (str){
    return new Promise((resolve,reject) => {
        fs.readFile(path.resolve(__dirname, './type.json'), (err, data) => {
            if(!err) {
                const extdata = JSON.parse(data.toString());
                resolve(extdata[str]);
            }
            reject(err)
        });
    })
    
}