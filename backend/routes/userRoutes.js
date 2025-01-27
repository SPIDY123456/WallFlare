const express = require('express');
const {registerUser,loginUser,getUserProfile, addToFavorites, getFavorites, deleteFromFavorites, uploadImage} = require('../controllers/userController');
const {protect} = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/profile',protect,getUserProfile);
router.post('/:userId/uploads',protect,uploadImage)
router.get('/:id/favorites',protect,getFavorites);
router.post("/:userId/favorites",protect,addToFavorites);
router.delete("/:userId/favorites",protect,deleteFromFavorites);

module.exports = router;