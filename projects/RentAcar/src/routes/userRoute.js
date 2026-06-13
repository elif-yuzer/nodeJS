const { verifyJWT, authorize } = require('../middlewares/authentication');
const { getUserProfile, list,update } = require('../controllers/userController'); 
//const queryHandler = require('../middlewares/queryHandler');
 
const router = require('express').Router();
 
// GET /users/profile → Kendi profilini görmek herkes
router.get('/profile', verifyJWT, authorize("user:readSelf"), getUserProfile);
router.get("/",verifyJWT,authorize("user:readAll"),list)
router.put("/:id",verifyJWT,authorize("user:updateSelf"),update)

 
module.exports = router;