const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main");
const { body } = require("express-validator/check");
const isAuth = require("../middleware/is-auth");

router.get("/", mainController.getMainPage);

router.post("/message", 
     [
         body("name", "Please use proper name!")
         .toString()
         .isLength({min: 3}),
         body("age", "Please, enter your real age!")
         .isNumeric()
         .isLength({max: 2}),
         body("phone", "Please use your real phone number!")
         .isLength({min: 5, max: 20})
     ], 
     isAuth,  mainController.postMessage);

module.exports = router;