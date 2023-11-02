const express = require("express");
const router = express.Router();
const User=("../models/user")
const { getUserById, getUser, getAllUsers,updateUser,userPurchaseList } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { update } = require("lodash");//It offers a wide range of functions for working with arrays, objects, strings, numbers, and more

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser);
router.get("/orders/user/:userId",isSignedIn,isAuthenticated,userPurchaseList);

//router.get("/users",getAllUsers);

module.exports = router;
