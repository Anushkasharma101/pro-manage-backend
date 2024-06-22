const express = require("express");

const router = express.Router();
const  userRegister  = require("../apis/userRegister.js");
const userLogin = require("../apis/userLogin.js");
const assignUser = require("../apis/assignUser.js");
const verifyToken = require("../middleware/verifyAccessToken.js");
const updateUserDetails = require("../apis/updateUserDetails.js");
const getUserDetails = require("../apis/getUserDetails.js");

router.post('/login',userLogin);
router.patch('/register',userRegister);
router.post('/assignedUser',verifyToken, assignUser);
router.patch('/updateUserDetails',verifyToken,updateUserDetails);
router.get('/getUserDetails',verifyToken,getUserDetails);

module.exports = router;