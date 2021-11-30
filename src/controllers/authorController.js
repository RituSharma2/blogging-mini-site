const authorModel = require("../model/authorModel")
const blogModel = require("../model/blogModel")



const createAuthor = async function (req, res) {
    try{
        var data = req.body
    let savedData = await authorModel.create(data)
    res.send({ data: savedData })
}catch(error){
    res.status(500).send({status:"failed",msg:error})
}

}








    






module.exports.createAuthor = createAuthor