const express = require("express");

const Router = express.Router();

Router.get(
  "/admin",

  async (req, res) => {
    res.json("asdasdasjdasd");
  }
);

module.exports = Router;
