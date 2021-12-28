/**
 * Handles exceptions that within the req pipeline
 */

"use strict";

module.exports = function (err, req, res, next) {
	res.status(500).send("Internal server error");

	next(err);
};
