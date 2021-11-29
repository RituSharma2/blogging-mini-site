const authorModel = require("../model/authorModel")
const blogModel = require("../model/blogModel")



const createAuthor = async function (req, res) {
    var data = req.body
    let savedData = await authorModel.create(data)
    res.send({ data: savedData })

}







const getBlogs = async function (req, res) {
    let authorId = req.query.authorId
    let category = req.query.category
    let tags = req.query.tags
    let subcategory = req.query.subcategory

    let blogs = await blogModel.find({isDeleted:false},{isPublished:true})
              res.send(blogs)
    





}
module.exports.createAuthor = createAuthor