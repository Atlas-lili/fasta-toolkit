var fs = require('fs');
var path = require('path');
var basePath = './input';
var dataStr = '';
var readTarget = 0;
var list = fs.readdirSync(basePath);
function read(file) {
    var filePath = path.join(basePath, file);
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            console.error(filePath + ' 读取失败！');
            readTarget--;
            return;
        }
        dataStr += '\n' + data;
        readTarget--;
        readTarget || write();
    });
}
;
function write() {
    console.log('----------------------------');
    var writePath = path.join(basePath, '../output/dist.fasta');
    fs.writeFile(writePath, dataStr, 'utf8', function (err) {
        if (err) {
            console.error(writePath + ' 写入失败！');
            return;
        }
        console.error(basePath + '下fasta文件合并到' + writePath + ' ，写入成功！');
    });
}
for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
    var file = list_1[_i];
    if (/\.fasta$/.test(file)) {
        readTarget++;
        read(file);
    }
}
