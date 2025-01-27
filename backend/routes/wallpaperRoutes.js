const express = require('express');
const { searchWallpapers, getLatestWallpapers, getRandomWallpapers,getImagesDetails, getWallPapers} = require('../controllers/wallpaperController');
const {protect} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/search',protect,searchWallpapers);            
router.get('/latest',protect,getLatestWallpapers);         
router.get('/random',protect,getRandomWallpapers);   
router.get('/wallpapers',protect,getWallPapers);
router.get('/:id',protect,getImagesDetails);      



module.exports = router;
