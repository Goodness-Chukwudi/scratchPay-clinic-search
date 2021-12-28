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

const findVetClinics = async (searchCriteria) => {
	const { clinics, error } = await getClinics(
		"https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json"
	);

	if (error) return { error };

	let vetClinicsSet = new Set(Object.values(clinics)),
		matchedVetClinics = [];

	if (searchCriteria.time)
		searchCriteria.time = convertTime(searchCriteria.time); //converts time to it's minutes equivalent

	for (const clinic of vetClinicsSet) {
		let nameMatched = true,
			stateMatched = true,
			timeMatched = true,
			openingTime = convertTime(clinic.opening.from),
			closingTime = convertTime(clinic.opening.to);

		//Regular expression to search for either state name and state code
		const expression = `.*${searchCriteria.clinicName}.*`,
			pattern = new RegExp(expression, "i");

		if (searchCriteria.clinicName && !pattern.test(clinic.clinicName))
			nameMatched = false;

		//Assuming they are all in capital letters
		if (
			searchCriteria.state &&
			!searchCriteria.state.includes(clinic.stateCode)
		)
			stateMatched = false;

		// Assuming the user can only select an hour with no mins and user can't pick the closing time
		//check if time falls within the available time
		if (
			searchCriteria.time &&
			(searchCriteria.time < openingTime ||
				searchCriteria.time >= closingTime)
		)
			timeMatched = false;

		if (timeMatched && stateMatched && nameMatched) {
			matchedVetClinics.push(clinic);
		}
	}
	return { matchedVetClinics };
};

module.exports = findVetClinics;
