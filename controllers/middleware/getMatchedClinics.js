/**
 * Route handler for searching clinics
 * returns a result object containing the search result or an empty object if no match was found
 *
 * result = {
 * "dentalClinics":[{
      "name":"Good Health Home",
      "stateName":"Alaska",
      "availability":{
         "from":"10:00",
         "to":"19:30"
      }
   }],

 * "vetClinics":[  {
       "clinicName":"City Vet Clinic",
       "stateCode":"NV",
       "opening":{
          "from":"10:00",
          "to":"22:00"
       }
    }]
 * }
 */
"use strict";

const log = require("../utils/errorLogger"),
	findDentalClinics = require("../../controllers/findDentalClinics"),
	findVetClinics = require("../../controllers/findVetClinics");

const matchClinics = async (req, res) => {
	let result = {};
	if (req.body.clinicType === "Dental") {
		//get the matched dental clinics and assign them to the result object
		const { matchedDentalClinics, error: dentalError } =
			await findDentalClinics(req.body.searchCriteria);

		if (dentalError) {
			log(dentalError);
			return res.status(500).send("Internal server error");
		}

		if (matchedDentalClinics.length > 0)
			result.dentalClinics = matchedDentalClinics;
	} else {
		//get the matched vet clinics and assign them to the result object
		const { matchedVetClinics, error: vetError } = await findVetClinics(
			req.body.searchCriteria
		);
		if (vetError) {
			log(vetError);
			return res.status(500).send("Internal server error");
		}

		if (matchedVetClinics.length > 0) result.vetClinics = matchedVetClinics;
	}

	//return search result
	res.status(200).send(result);
};

module.exports = matchClinics;
