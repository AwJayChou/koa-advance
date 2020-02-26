const path = require('path')
const fs = require('fs')
module.exports = (dirPath = './public') => {
    return async (ctx, next) => {
        if (ctx.url.indexOf('/public') > -1) {
            const url = path.resolve(__dirname, dirPath)
            // const fileBaseName = path.basename(url)
            const filepath = url + ctx.url.replace('/public',"")
            console.log(filepath)
        }
        try{
            //  判断文件 类型   文件&&文件夹
            status = fs.statSync(filepath);
            if(status.isDirectory()){
                const dir = fs.readdirSync(filepath);

                const ret = ['<div style="color:black">']
                dir.forEach(filename => {
                    if(filename.indexOf('.')>-1){
                        ret.push(
                            `<p><a style="color:black" href="${ctx.url/${filename}}">${filename}</a></p>`;
                        )
                    }
                })
            }else {
                const content = fs.readFileSync(filepath);
                ctx.body = content;
            }
        }catch(e){
            ctx.body = "404, 不存在";
        }
    }
}