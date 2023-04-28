const express = require("express");
const withDBConnection = require("../middlewares/withDBConnection");
const users = require("../routes/users");
const blogs = require("../routes/blogs")
const error = require("../middlewares/error");
const login = require("../routes/login")

module.exports = function (app) {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(withDBConnection);
    app.use("/login", login);
    app.use("/users", users);
    app.use("/blogs", blogs);
    app.use(error);
}