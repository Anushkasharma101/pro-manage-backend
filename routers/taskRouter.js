const express = require("express");
const verifyToken = require("../middleware/verifyAccessToken.js");
const createTask = require("../apis/createTask");
const updateCategory = require("../apis/updateCategory.js");
const updateCheckMark = require("../apis/updateCheckMark.js");
const getTaskById = require("../apis/getTaskById.js");
const router = express.Router();

router.post("/createTask",verifyToken,createTask);
router.patch("/updateCategory/:id",updateCategory);
router.patch("/updateCheckMark/:id",updateCheckMark);
router.get("/getTaskById/:id",getTaskById);

module.exports = router;