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

module.exports = async function findVetClinics(searchWords) {
	const { clinics, error } = await getClinics(
		"https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json"
	);

	if (error) return { error };

	let vetClinicsSet = new Set(Object.values(clinics)),
		matchedVetClinics = [];

	if (searchWords.time) searchWords.time = searchWords.time * 60; //converts time to it's minutes equivalent
	for (const value of vetClinicsSet.values()) {
		let nameMatched = true,
			stateMatched = true,
			timeMatched = true,
			openingTime = convertTime(value.opening.from),
			closingTime = convertTime(value.opening.to);

		//Regular expression to search for either state name and state code
		const expression = `.*${searchWords.clinicName}.*`,
			pattern = new RegExp(expression, "i");

		if (searchWords.clinicName && !pattern.test(value.clinicName))
			nameMatched = false;

		//Assuming they are all in capital letters
		if (searchWords.state && !searchWords.state.includes(value.stateCode))
			stateMatched = false;

		// Assuming the user can only select an hour with no mins and user can't pick the closing time
		//check if time falls within the available time
		if (
			searchWords.time &&
			(searchWords.time < openingTime || searchWords.time >= closingTime)
		)
			timeMatched = false;

		if (timeMatched && stateMatched && nameMatched) {
			matchedVetClinics.push(value);
		}
	}

	return { matchedVetClinics };
};
