const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('graficos/index');
});

module.exports = router;
