/**
 * Makes an axios HTTP GET call to get a list of clinics
 *
 * return a list of objects
 */

"use strict";
const axios = require("axios");

const getClinics = async (url) => {
	try {
		const response = await axios.get(url);
		return { clinics: response.data };
	} catch (error) {
		return { error };
	}
};

module.exports = getClinics;
