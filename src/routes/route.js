const express = require('express');
const router = express.Router();

//--------------------------------------------------
const authorController =require('../controllers/authorController')
const blogController = require ('../controllers/blogController')
const mid1=require('../middleware/tokenMiddleware')






//=---------------------------------------
router.post("/Authors" ,authorController.createAuthor )

router.post('/blogs',mid1.mid1, blogController.Blogs)

router.get('/getBlog',mid1.mid1, blogController.getBlogs)

router.put('/blogs/:blogId',mid1.mid2, blogController.updating)

router.delete('/blogs/:blogId',mid1.mid2, blogController.deleting)

router.delete('/blogs' ,mid1.mid1, blogController.specificdeleting)

router.post('/login',blogController.loginAuthor)


module.exports = router;