const express = require('express');
const router = express.Router();

//--------------------------------------------------
const authorController =require('../controllers/authorController')
const blogController = require ('../controllers/blogController')






//=---------------------------------------
router.post("/Authors" ,authorController.createAuthor )

router.post('/blogs', blogController.Blogs)

router.get('/getBlog', blogController.getBlogs)

router.put('/blogs/:blogId', blogController.updating)

router.delete('/blogs/:blogId', blogController.deleting)


module.exports = router;