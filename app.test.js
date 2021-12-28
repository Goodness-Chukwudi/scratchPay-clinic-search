//Jest unit test
const convertTime = require("./controllers/utils/convertTime");
describe("converts time to minutes", () => {
	test("Returns null for inputs that are not string", () => {
		expect(convertTime(6)).toBe(null);
	});

	test("Returns null for inputs that do not have valid time in the string", () => {
		expect(convertTime("invalid time")).toBe(null);
		expect(convertTime("invalid:time")).toBe(null);
		expect(convertTime("invalid: time")).toBe(null);
		expect(convertTime("")).toBe(null);
		expect(convertTime("   ")).toBe(null);
		expect(convertTime(" :  ")).toBe(null);
		expect(convertTime(" 2hour:3mins")).toBe(123);
		expect(convertTime(" 2hour:3mins:4secs")).toBe(null);
		expect(convertTime(" hour2:mins3")).toBe(null);
		expect(convertTime(" ;  ")).toBe(null);
		expect(convertTime("1:30:45")).toBe(null);
	});

	test("Returns an integer for valid time inputs", () => {
		expect(convertTime("2")).toBe(120);
		expect(convertTime("1:30")).toBe(90);
	});
});

const findDentalClinics = require("./controllers/findDentalClinics");
describe("finds matching dental clinics", () => {
	//	Test 1
	test("Returns empty object if no match was found", () => {
		return expect(
			findDentalClinics({
				clinicName: "Scratch Health",
				state: ["Florida", "FL"],
				time: "16:00",
			})
		).resolves.toEqual(expect.objectContaining([]));
	});

	//Test 2
	test("Returns empty object if no match was found", () => {
		return expect(
			findDentalClinics({
				clinicName: "Scratch Health",
				state: ["California", "CA"],
			})
		).resolves.toEqual(expect.objectContaining([]));
	});

	//Test 3
	test("Returns a clinic object matching the combination of criteria", () => {
		const expected = expect.objectContaining({
			matchedDentalClinics: [
				{
					name: "Mayo Clinic",
					stateName: "Florida",
					availability: expect.objectContaining({
						from: "09:00",
						to: "20:00",
					}),
				},
				{
					name: "Hopkins Hospital Baltimore",
					stateName: "Florida",
					availability: expect.objectContaining({
						from: "07:00",
						to: "22:00",
					}),
				},
			],
		});

		return expect(
			findDentalClinics({
				state: ["Florida", "FL"],
			})
		).resolves.toEqual(expected);
	});

	// Test 4
	test("Returns a clinic object matching the combination of criteria", () => {
		const expected = expect.objectContaining({
			matchedDentalClinics: [
				{
					name: "Mayo Clinic",
					stateName: "Florida",
					availability: expect.objectContaining({
						from: "09:00",
						to: "20:00",
					}),
				},
				{
					name: "Hopkins Hospital Baltimore",
					stateName: "Florida",
					availability: expect.objectContaining({
						from: "07:00",
						to: "22:00",
					}),
				},
			],
		});

		return expect(
			findDentalClinics({
				state: ["Florida", "FL"],
				time: "18:00",
			})
		).resolves.toEqual(expected);
	});

	// Test 5
	test("Returns a clinic object matching the combination of criteria", () => {
		const expected = expect.objectContaining({
			matchedDentalClinics: [
				{
					name: "Scratchpay Test Pet Medical Center",
					stateName: "California",
					availability: expect.objectContaining({
						from: "00:00",
						to: "24:00",
					}),
				},
				{
					name: "Scratchpay Official practice",
					stateName: "Tennessee",
					availability: expect.objectContaining({
						from: "00:00",
						to: "24:00",
					}),
				},
			],
		});

		return expect(
			findDentalClinics({
				clinicName: "Scratchpay",
				time: "9:00",
			})
		).resolves.toEqual(expected);
	});

	// Test 6
	test("Returns a clinic object matching the combination of criteria", () => {
		const expected = expect.objectContaining({
			matchedDentalClinics: [
				{
					name: "Good Health Home",
					stateName: "Alaska",
					availability: expect.objectContaining({
						from: "10:00",
						to: "19:30",
					}),
				},
			],
		});

		return expect(
			findDentalClinics({
				clinicName: "Good Health Home",
				state: ["Alaska", "AK"],
				time: "11:00",
			})
		).resolves.toEqual(expected);
	});
});

const findVetClinics = require("./controllers/findVetClinics");
describe("finds matching vet clinics", () => {
	//	Test 1
	test("Returns empty object if no match was found", () => {
		return expect(
			findVetClinics({
				clinicName: "Good Health Home",
				state: ["Florida", "FL"],
				time: "7:00",
			})
		).resolves.toEqual(expect.objectContaining([]));
	});

	//Test 2
	test("Returns empty object if no match was found", () => {
		return expect(
			findVetClinics({
				clinicName: "Scratchpay Test Pet Medical Center",
				state: ["Florida", "FL"],
			})
		).resolves.toEqual(expect.objectContaining([]));
	});

	//Test 3
	test("Returns a clinic object matching the combination of criteria", () => {
		const expected = expect.objectContaining({
			matchedVetClinics: [
				{
					clinicName: "Good Health Home",
					stateCode: "FL",
					opening: expect.objectContaining({
						from: "15:00",
						to: "20:00",
					}),
				},
			],
		});

		return expect(
			findVetClinics({
				state: ["Florida", "FL"],
			})
		).resolves.toEqual(expected);
	});

	// Test 4
	test("Returns a clinic object matching the combination of criteria", () => {
		const expected = expect.objectContaining({
			matchedVetClinics: [
				{
					clinicName: "German Pets Clinics",
					stateCode: "KS",
					opening: expect.objectContaining({
						from: "08:00",
						to: "20:00",
					}),
				},

				{
					clinicName: "Scratchpay Test Pet Medical Center",
					stateCode: "CA",
					opening: expect.objectContaining({
						from: "00:00",
						to: "24:00",
					}),
				},
			],
		});

		return expect(
			findVetClinics({
				clinicName: "pet",
				time: "8:00",
			})
		).resolves.toEqual(expected);
	});

	// Test 5
	test("Returns a clinic object matching the combination of criteria", () => {
		const expected = expect.objectContaining({
			matchedVetClinics: [
				{
					clinicName: "Scratchpay Test Pet Medical Center",
					stateCode: "CA",
					opening: expect.objectContaining({
						from: "00:00",
						to: "24:00",
					}),
				},
			],
		});

		return expect(
			findVetClinics({
				clinicName: "Scratchpay",
			})
		).resolves.toEqual(expected);
	});

	// Test 6
	test("Returns a clinic object matching the combination of criteria", () => {
		const expected = expect.objectContaining({
			matchedVetClinics: [
				{
					clinicName: "Scratchpay Test Pet Medical Center",
					stateCode: "CA",
					opening: expect.objectContaining({
						from: "00:00",
						to: "24:00",
					}),
				},
			],
		});

		return expect(
			findVetClinics({
				clinicName: "Scratchpay",
				state: ["California", "CA"],
				time: "10:00",
			})
		).resolves.toEqual(expected);
	});
});
