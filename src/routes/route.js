const express = require('express');
const router = express.Router();

//--------------------------------------------------
const authorController =require('../controllers/authorController')
const blogController = require ('../controllers/blogController')






//=---------------------------------------
router.post("/Authors" ,authorController.createAuthor )

//router.post("/Authors" ,blogController.createAuthor )
router.post('/blogs', blogController.Blogs)
module.exports = router;