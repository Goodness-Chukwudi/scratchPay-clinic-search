/**
 * Takes a searchCriteria object and returns matching clinincs
 * searchCriteria={
 * clinicName: "name of clinic",
 * state: "location of clininc",
 *  time: 1 //appointment time
 * }
 */

"use strict";
const getClinics = require("../model/getClinics"),
	convertTime = require("./utils/convertTime");

const findDentalClinics = async (searchCriteria) => {
	let { clinics, error } = await getClinics(
		"https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json"
	);

	if (error) return { error };

	let dentalClinicsSet = new Set(Object.values(clinics)),
		matchedDentalClinics = [];

	if (searchCriteria.time)
		searchCriteria.time = convertTime(searchCriteria.time); //converts time to it's minutes equivalent

	for (const value of dentalClinicsSet.values()) {
		//assumes they all matched till we find one that doesnt match
		let nameMatched = true,
			stateMatched = true,
			timeMatched = true,
			openingTime = convertTime(value.availability.from),
			closingTime = convertTime(value.availability.to);

		//test if there is a clinic name match
		const expression = `.*${searchCriteria.clinicName}.*`,
			pattern = new RegExp(expression, "i");

		if (searchCriteria.clinicName && !pattern.test(value.name)) {
			nameMatched = false;
		}

		//test if there is a state or state code match
		//Assuming they are all in capital letters
		if (
			searchCriteria.state &&
			!searchCriteria.state.includes(value.stateName)
		) {
			stateMatched = false;
		}

		//test if there is an availability match
		// Assuming the user can only select an hour with no mins and user can't pick the closing time
		//check if time falls within the available time
		if (
			searchCriteria.time &&
			(searchCriteria.time < openingTime ||
				searchCriteria.time >= closingTime)
		)
			timeMatched = false;

		if (timeMatched && stateMatched && nameMatched) {
			matchedDentalClinics.push(value);
		}
	}
	return { matchedDentalClinics };
};

module.exports = findDentalClinics;
