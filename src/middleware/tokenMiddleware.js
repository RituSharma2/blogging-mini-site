let blogModel = require('../model/blogModel');
let authorModel = require('../model/authorModel');
const jwt = require('jsonwebtoken')
//const mid1 = require('../middleware/tokenMiddleware')


const mid1 = function (req, res, next) {
    try {
        let token = req.headers['x-api-key']
        if (!token) {
            return res.status(401).send({ status: false, msg: "no authentication token" })
        } else {
            let decodeToken = jwt.verify(token, 'backend')
            if (decodeToken) {
                req.decodeToken = decodeToken
                next()

            } else {
                res.status(401).send({ status: false, msg: "not a valid token" })
            }
        }

    } catch (error) {
        res.status(500).send({ status: false, msg: error })
    }


}

const mid2= async function(req ,res,next){
    try{
        const id=req.params.blogId
        const data=await blogModel.findById(id)
         const authorId=data.authorId
         const token=req.headers['x-api-key']
         var decoded = jwt.verify(token, 'backend');
         if(decoded._id==authorId)
         next()
         else
         res.status(404).send({status:false,msg:"it is not valid id, plz fill valid id"})
    }
    catch(err){
         res.status(500).send({status:false,msg:err.message})
    }
}
module.exports.mid2 =  mid2;

module.exports.mid1 = mid1