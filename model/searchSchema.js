"use strict";
const Joi = require("joi");

const searchSchema = Joi.object({
	clinicType: Joi.string().valid("Dental", "Vet").required(),
	searchCriteria: Joi.object({
		clinicName: Joi.string().max(500).trim(),
		state: Joi.array()
			.items(Joi.string().max(100).trim())
			.length(2)
			.message(
				"Enter a valid state name and code. eg. ['Florida', 'FL']"
			),
		time: Joi.string()
			.max(5)
			.trim()
			.message("Enter a valid time input. eg. 10:20"),
	}).required(),
});

module.exports = searchSchema;
