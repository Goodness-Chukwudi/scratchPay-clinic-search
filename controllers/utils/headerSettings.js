"use strict";

module.exports = (req, res, next) => {
	// res.header("Access-Control-Allow-Credentials", true);
	res.header(
		"Access-Control-Allow-Origin",
		"http://localhost:5500" || req.headers.origin //replace with your domain name if in production
	);
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	// res.header(
	// 	"Access-Control-Allow-Headers",
	// 	"Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token"
	// );
	if (req.method === "OPTIONS") {
		return res.status(200).end();
	} else {
		next();
	}
};
