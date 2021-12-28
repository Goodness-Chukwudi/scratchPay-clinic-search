"use strict";

const express = require("express"),
	router = express(),
	validateInput = require("../controllers/middleware/validation/validateSearchInput"),
	getMatchedClinics = require("../controllers/middleware/getMatchedClinics");

router.post("/", validateInput, getMatchedClinics);

module.exports = router;
