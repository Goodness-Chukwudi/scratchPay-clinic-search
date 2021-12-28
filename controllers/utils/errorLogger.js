/**
 * Receives an error object as an input and uses winston to format and log it on the console
 * Add a winston mongoDB or file transport if needed i.e in production
 * */

"use strict";
const winston = require("winston");

const logger = (err) => {
	winston.add(
		new winston.transports.Console({
			format: winston.format.prettyPrint(),
		})
	);
	winston.log({
		level: "error",
		message: err.message,
		stack: err.stack,
	});
};

module.exports = logger;
