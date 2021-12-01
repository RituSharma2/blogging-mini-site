const authorModel = require("../model/authorModel")




const createAuthor = async function (req, res) {
    try{
        var data = req.body
    let savedData = await authorModel.create(data)
    res.status(200).send({ data: savedData })
}catch(error){
    res.status(500).send({status:"failed",message:error.message})
    }

}








    






module.exports.createAuthor = createAuthor