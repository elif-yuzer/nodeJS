const { verifyJWT, authorize } = require("../middlewares/authentication");
const {
  list,
  read,
  update,
  deletee,
} = require("../controllers/userController");
const customFilter = require("../middlewares/customFilter");
const queryHandler = require("../middlewares/queryHandler");
const { listCars,createCar,readCar } = require("../controllers/carController");
//const queryHandler = require('../middlewares/queryHandler');

const router = require("express").Router();

// GET /users/profile → Kendi profilini görmek herkes
router.get(
  "/",
  verifyJWT,
  authorize("car:readAll"),
  customFilter,
  queryHandler,
  listCars,
);
router.post("/", verifyJWT, authorize("car:create"), createCar);
/* router.put("/cars/:id", verifyJWT, authorize("car:update"), updateCar);
router.delete("/cars/:id", verifyJWT, authorize("car:delete"), deleteCar); */

module.exports = router;
