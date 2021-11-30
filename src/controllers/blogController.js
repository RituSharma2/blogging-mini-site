let blogModel = require('../model/blogModel');
let authorModel = require('../model/authorModel');


let Blogs = async function (req, res) {
    try {
        let data = req.body
        let authorId = req.body.author
        let authorReq = await authorModel.findById(authorId)
        if (authorReq) {
            let createBlog = await blogModel.create(data)
            res.status(201).send({ status: true, data: createBlog })
        } else {
            res.status(400).send({ status: false, msg: `${authorReq} is not available, please enter valid authorId` })
        }
    } catch (error) {
        res.status(500).send({ status: false, msg: 'somthing unexpected heppend!' })
    }
};
//===========================================================================================================================
const getBlogs = async function (req, res) {
    try {
        let arr = []
        let authorId = req.query.authorId
        let category = req.query.category
        let tags = req.query.tags
        let subcategory = req.query.subcategory

        let blogs = await blogModel.find({
            $or: [{ authorId: authorId }, { category: category }, { tags: tags }, { subcategory: subcategory },
            ]
        })


        if (blogs) {
            for (let element of blogs) {
                if (element.isDeleted === false && element.isPublished === true) {
                    arr.push(element)
                }
                console.log(arr)
            }
            res.status(200).send({status:true,data:arr})

        } else {
            res.status(400).send("no blog")

        }
    }
    catch (err) { res.status(500).send({ msg: "Something went wrong" }) }

}
//===========================================================================================================================
const updating = async function (req, res) {
    const Id = req.params.blogId
    try {
        if (Id) {
            let data = await blogModel.findById(Id)
            if (data.isDeleted == false) {
                let value1 = req.body.bodyupdate
                let value2 = req.body.title
                const arr2 = req.body.subcategory
                const arr1 = req.body.tags
                data.tags = data.tags.concat(arr1)
                const result1 = data.tags.filter(b => b != null)
                console.log(data.tags)
                data.subcategory = data.subcategory.concat(arr2)
                const result2 = data.tags.filter(b => b != null)
                console.log(data.subcategory)
                let data2 = await blogModel.findOneAndUpdate({ _id: Id }, { title: value2, body: value1, tags: result1, subcategory: result2 }, { new: true })
                if (data.isPublished == false)
                    data2 = await blogModel.findOneAndUpdate({ _id: Id }, { isPublished: true, publishedAt: Date.now() }, { new: true })
                res.status(200).send({ status: true, msg: data2 })
            }
            else
                res.status(404).send({ status: "false", msg: "data is already deleted" })

        }
        else
            res.status(404).send({ status: "false", msg: "id is not exist" })

    }
    catch (err) { res.status(500).send({ msg: "Something went wrong" }) }
}

//==================================================================================================================================
const deleting = async function (req, res) {
    let id = req.params.blogId
    try {
        let data = await blogModel.findById(id)
        if (data) {
            if (data.isDeleted == false) {
                data2 = await blogModel.findOneAndUpdate({ _id: id }, { isDeleted: true }, { new: true })
                res.status(200).send({ status: true, msg: data2 })
            } else {
                res.status(200).send({ status: false, msg: "data already deleted" })
            }


        } else {
            res.status(404).send({ status: false, msg: "id does not exist" })
        }
    }
    catch (err) { res.status(500).send({ msg: "something went wrong" }) }
}









module.exports.getBlogs = getBlogs
module.exports.Blogs = Blogs;
module.exports.deleting = deleting;
module.exports.updating = updating;


