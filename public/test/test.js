const fs = require("fs");
const path = require("path");

module.exports = (dirPath = "./public") =>{
    if(ctx.url.indexOf("/public") === 0 ) {
        const url = path.resolve(__dirname,dirPath); // 获取文件绝对路径
        const filepath = url + ctx.url.replace("/public","") // 当前请求路径
        try{
            stat = fs.statSync(filepath)
            if(stat.isDictory()) {  // 当前是否为文件夹
                console.log("文件夹")
                const dir = fs.readdirSync(filepath); // 读取文件中的内容
                const ret = ['<div style="padding-left:20px">']
                dir.forEach(filename => {
                    if(filename.indexOf(".")>0){ // 判断是否为文件夹
                        ret.push(`<p><a style="color:black" href="${ctx.url}/${filename}">${filename}</a></p>`)
                    } else {
                        ret.push(`<p><a  href="${ctx.url}/${filename}">${filename}</a></p>`)
                    }
                    
                })
                ret.push("</div>")
                ctx.body = ret.join("")
            } else {
                console.log("文件");
                const content = fs.readFileSync(filepath)
                ctx.body = content 
            }
        } catch(e) {
            ctx.body = "resources not found"
        }

    }
}