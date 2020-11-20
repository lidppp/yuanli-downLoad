const fs = require("fs")
const officegen = require("officegen")
const path = require("path")

module.exports = function creatDocx(arrs, flName) {
    let docx = officegen({type:'docx',pageMargins :{top:0,right:0,left:0,bottom:0}})
    // Officegen calling this function after finishing to generate the docx document:
    docx.on('finalize', function (written) {
        console.log(
            'Finish to create a Microsoft Word document.' , written
        )
    })

    // Officegen calling this function to report errors:
    docx.on('error', function (err) {
        console.log(err)
    })


    console.log(arrs)
    for (let i = 0; i < arrs.length; i++) {
        let pObj = docx.createP();
        if(arrs[i]){
            pObj.addImage(path.resolve(__dirname,path.join("../downLoad",decodeURI(arrs[i]))),{cx:793,cy:1122})
        }else{
            pObj.addText('当前图片不正确')
            pObj.addText(' 页码为: '+i, {  font_size: 40 })
        }
    }




    let out = fs.createWriteStream(path.resolve(__dirname,path.join("../out/", flName + '.docx')))

    out.on('error', function (err) {
        console.log(err)
    })

    // Async call to generate the output file:
    docx.generate(out)
}

// creatDocx(null, "test")