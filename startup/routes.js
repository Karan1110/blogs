const express = require("express");
const users = require("../routes/users")
const error = require("../middlewares/error");
const login = require("../routes/login")

module.exports = function (app) {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    // app.use(asyncErrors());
    require('express-async-errors');
    app.use("/users", users);
    app.use("/login", login);
    app.use(error);
}