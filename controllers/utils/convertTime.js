"use strict";

/**
 *
 * takes a time string of only hour and minutes part and converts it to minutes
 *
 * returns the time equivalent in minutes as an interger
 */
module.exports = (timeString) => {
	if (!timeString || typeof timeString !== "string") return null;
	// Assuming that the time provided has only hour and minutes part
	let timeFragments = timeString.split(":");
	if (timeFragments.length === 2) {
		return isNaN(parseInt(timeFragments[0] + timeFragments[1]))
			? null
			: parseInt(timeFragments[0]) * 60 + parseInt(timeFragments[1]);
	} else if (timeFragments.length === 1) {
		return isNaN(parseInt(timeFragments[0]))
			? null
			: parseInt(timeFragments[0]) * 60;
	} else return null;
};
