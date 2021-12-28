/**
 * Takes a searchWords object and returns matching clinincs
 * searchWords={
 * clinicName: "name of clinic",
 * state: "location of clininc",
 *  time: 1 //appointment time
 * }
 */

"use strict";
const getClinics = require("../model/getClinics"),
	convertTime = require("./utils/convertTime");

module.exports = async function findDentalClinics(searchWords) {
	let { clinics, error } = await getClinics(
		"https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json"
	);

	if (error) return { error };

	let dentalClinicsSet = new Set(Object.values(clinics)),
		matchedDentalClinics = [];

	if (searchWords.time) searchWords.time = searchWords.time * 60; //converts time to it's minutes equivalent
	for (const value of dentalClinicsSet.values()) {
		//assumes they all matched till we find one that doesnt match
		let nameMatched = true,
			stateMatched = true,
			timeMatched = true,
			openingTime = convertTime(value.availability.from),
			closingTime = convertTime(value.availability.to);

		//test if there is a clinic name match
		const expression = `.*${searchWords.clinicName}.*`,
			pattern = new RegExp(expression, "i");

		if (searchWords.clinicName && !pattern.test(value.name)) {
			nameMatched = false;
		}

		//test if there is a state or state code match
		//Assuming they are all in capital letters
		if (searchWords.state && !searchWords.state.includes(value.stateName)) {
			stateMatched = false;
		}

		//test if there is an availability match
		// Assuming the user can only select an hour with no mins and user can't pick the closing time
		//check if time falls within the available time
		if (
			searchWords.time &&
			(searchWords.time < openingTime || searchWords.time >= closingTime)
		)
			timeMatched = false;

		if (timeMatched && stateMatched && nameMatched) {
			matchedDentalClinics.push(value);
		}
	}
	return { matchedDentalClinics };
};
