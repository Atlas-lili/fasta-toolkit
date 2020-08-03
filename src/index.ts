const fs: any = require('fs');
const path: any = require('path');

const basePath: string = './input';
let dataStr: string = '';

let readTarget: number = 0;

const list: string[] = fs.readdirSync(basePath);
function read(file: string): void {
    const filePath = path.join(basePath, file);
    fs.readFile(filePath, 'utf8', function (err: any, data: string): void {
        if (err) {
            console.error(filePath + ' 读取失败！');
            readTarget--;
            return;
        }
        dataStr += '\n' + data;
        readTarget--;
        readTarget || write();
    });
};

function write(): void {
    console.log('----------------------------');
    const writePath = path.join(basePath, '../output/dist.fasta');
    fs.writeFile(writePath, dataStr, 'utf8', function (err: any): void {
        if (err) {
            console.error(writePath + ' 写入失败！');
            return;
        }
        console.error(basePath + '下fasta文件合并到' + writePath + ' ，写入成功！');
    });
}

for (const file of list) {
    if (/\.fasta$/.test(file)) {
        readTarget++;
        read(file);
    }
}
