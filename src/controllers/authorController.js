const authorModel = require("../model/authorModel")
const blogModel = require("../model/blogModel")



const createAuthor = async function (req, res) {
    var data = req.body
    let savedData = await authorModel.create(data)
    res.send({ data: savedData })

}








    






module.exports.createAuthor = createAuthor