const express = require("express");
const { signup, signin } = require("../controls/userControles");
const routeUser = express.Router();



routeUser.post("/signup", signup);


routeUser.post("/signin", signin);


module.exports = routeUser;