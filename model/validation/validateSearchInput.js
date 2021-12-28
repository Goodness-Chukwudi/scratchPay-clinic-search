"use strict";
const Joi = require("joi"),
	xss = require("xss");
/*
* validates the user search input.
* A correct input should look like the search object below
search = {
		isDentalClinic: true,
		searchWords: {
			clinicName: "name of clinic",
			state: ["state name", "state code"],
			time: 1, //appointment time
		},
	}
 * */

const searchSchema = Joi.object({
	isDentalClinic: Joi.boolean().required(),
	searchWords: Joi.object({
		clinicName: Joi.string().max(500).trim(),
		state: Joi.array().items(Joi.string().max(100).trim()).length(2),
		time: Joi.number().max(24),
	}).required(),
});

function sanitizeInput({ value, error }) {
	if (value.searchWords.clinicName)
		value.searchWords.clinicName = xss(value.searchWords.clinicName);
	if (value.searchWords.state)
		value.searchWords.state[0] = xss(value.searchWords.state[0]);
	if (value.searchWords.state)
		value.searchWords.state[1] = xss(value.searchWords.state[1]);
	return { value, error };
}

module.exports = (input) => {
	const { value, error } = searchSchema.validate(input, { convert: false });
	return sanitizeInput({ value, error });
};
