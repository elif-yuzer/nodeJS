"use strict";

const { verifyJWT, authorize } = require('../middlewares/authentication');
const { createReservation } = require('../controllers/reservationController');

console.log("verifyJWT:", typeof verifyJWT);
console.log("authorize:", typeof authorize);
console.log("createReservation:", typeof createReservation);

const router = require('express').Router();


router.post(
  '/',
  verifyJWT,
  authorize("reservation:create"),
  createReservation
);

module.exports = router;