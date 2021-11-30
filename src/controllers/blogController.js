let blogModel = require('../model/blogModel');
let authorModel = require('../model/authorModel');

//===============================================================================================================
let Blogs = async function (req, res) {

    try {
        let data = req.body
        if (data.isPublished == true) {
            data["publishedAt"] = new Date();
        }
        let authorId = data.authorId
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

        let array = []
        let authorId = req.query.authorId
        let tags = req.query.tags
        let category = req.query.category
        let subcategory = req.query.subcategory
        let blog = await blogModel.find({ $or: [{ authorId: authorId }, { category: category }, { tags: tags }, { subcategory: subcategory }] })

        if (blog.length > 0) {

            for (let element of blog) {

                if (element.isDeleted === false && element.isPublished === true) {

                    array.push(element)

                }

            }
        } else {
            res.status(404).send({
                status: false,
                msg: "no such blog found"
            })
        }

    }
    catch (err) {
        console.log(err)
        res.send(err)
    }

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

//===================================================================================================================================================
const deleting = async function (req, res) {
    let id = req.params.blogId
    try {
        let data = await blogModel.findById(id)
        if (data) {
            if (data.isDeleted == false) {
                data2 = await blogModel.findOneAndUpdate({ _id: id }, { isDeleted: true, deletedAt: new Date() }, { new: true })
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

//==========================================================================================================================================================
const specificdeleting = async function (req, res) {
    try {
        let result = []
        const category = req.query.category
        const authorId = req.query.authorId
        const tags = req.query.tags
        const subcategory = req.query.subcategory
        let blogs = await blogModel.find({ $or: [{ tags: tags }, { subcategory: subcategory }, { authorId: authorId }, { category: category }] })

        console.log(blogs)
        if (blogs.length > 0) {
            for (let element of blogs) {
                if (element.isDeleted == false && element.isPublished == false) {
                    data = await blogModel.findOneAndUpdate({ _id: element._id }, { isDeleted: true }, { new: true })
                    console.log(data)
                    result.push(data)
                }
            } console.log(result)
            res.send({ status: true, msg: result })
        }
        else
            res.status(404).send({ status: false, msg: "data is not available" })
    }
    catch (err) {
        res.status(404).send({ status: false, msg: "someting wrong exist" })
    }
}











module.exports.getBlogs = getBlogs
module.exports.Blogs = Blogs;
module.exports.deleting = deleting;
module.exports.updating = updating;
module.exports.specificdeleting = specificdeleting

