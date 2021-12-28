/**
 * Handles exceptions that within the req pipeline
 */

"use strict";

const errorHandler = (err, req, res, next) => {
	res.status(500).send("Internal server error");

	next(err);
};

module.exports = errorHandler;
