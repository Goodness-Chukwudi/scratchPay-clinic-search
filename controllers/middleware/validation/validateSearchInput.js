/*
* validates the user search input.
* A correct input should look like the search object below
search = {
		clinicType: "Dental" || "Vet",
		searchCriteria: {
			clinicName: "name of clinic",
			state: ["state name", "state code"],
			time: "10:00", //appointment time
		},
	}
 * */

"use strict";
const xss = require("xss"),
	searchSchema = require("../../../model/searchSchema");

const validator = (req, res, next) => {
	const sanitizeInput = (input) => {
		if (input.clinicType) input.clinicType = xss(input.clinicType);

		if (input.searchCriteria.clinicName)
			input.searchCriteria.clinicName = xss(
				input.searchCriteria.clinicName
			);

		if (input.searchCriteria.state)
			input.searchCriteria.state[0] = xss(input.searchCriteria.state[0]);

		if (input.searchCriteria.state)
			input.searchCriteria.state[1] = xss(input.searchCriteria.state[1]);

		return input;
	};

	// validate search inputs
	const { value, error } = searchSchema.validate(req.body, {
		convert: false,
	});

	if (error) return res.status(400).send(error.details[0].message);

	const searchInput = sanitizeInput(value);
	req.body = searchInput;
	next();
};

module.exports = validator;
