"use strict";

/**
 *
 * takes a time string of only hour and minutes part and converts it to minutes
 *
 * returns the time equivalent in minutes as an interger
 */

const timeConverter = (timeString) => {
	if (!timeString || typeof timeString !== "string") return null;
	// Assuming that the time provided has only hour and minutes part
	let timeFragments = timeString.split(":");
	if (timeFragments.length === 2) {
		let hour = parseInt(timeFragments[0]),
			mins = parseInt(timeFragments[1]);

		return isNaN(hour + mins) ? null : hour * 60 + mins;
	} else if (timeFragments.length === 1) {
		let hour = parseInt(timeFragments[0]);

		return isNaN(hour) ? null : hour * 60;
	} else return null;
};

module.exports = timeConverter;
