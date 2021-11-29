const express = require('express');
const router = express.Router();
const controller = require ('../controllers/cryptoController')
//--------------------------------------------------
const authorController =require('../controllers/authorController')
const blogController = require ('../controllers/blogController')



router.get("/coins" ,controller.getCoins );


//=---------------------------------------
router.post("/Authors" ,authorController.createAuthor )

//router.post("/Authors" ,blogController.createAuthor )
router.post('/blogs', blogController.Blogs)
module.exports = router;