let blogModel = require('../model/blogModel');
let authorModel = require('../model/authorModel');


let Blogs = async function (req, res) {
    try {
        let data = req.body
        let authorId = req.body.author
        let authorReq = await authorModel.findById(authorId)
        if (authorReq){
            let createBlog = await blogModel.create(data)
            res.status(201).send( { status: true, data: createBlog } )
        } else {
            res.status(400).send( { status: false, msg: `${authorReq} is not available, please enter valid authorId` } )
        }
    } catch(error) {
        res.status(500).send( { status: false, msg: 'somthing unexpected heppend!' } )
    }
};
module.exports.Blogs =  Blogs;
