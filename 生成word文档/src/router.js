const express = require("express")
const router = express.Router()
const creatDocx = require("./creatDocx")

router.get("/", (req, res) => {
    res.send(JSON.stringify({msg: "Hello"}))
})


router.post("/creatWorld", (req, res) => {
    console.log(req.body)
    creatDocx(req.body.imgList, req.body.fileName)
    var obj = {}
    obj.code = 200
    res.send(JSON.stringify(obj))
})

module.exports = router
