const { verifyJWT, authorize } = require('../middlewares/authentication');
const { getUserProfile } = require('../controllers/userController'); 
 
const router = require('express').Router();
 
// GET /users/profile → Kendi profilini görmek
router.get('/profile', verifyJWT, authorize("user:readSelf"), getUserProfile);
 
module.exports = router;