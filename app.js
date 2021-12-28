"use strict";
if (process.env.NODE_ENV != "production") require("dotenv").config();

const express = require("express"),
	app = express(),
	log = require("./controllers/utils/errorLogger");
require("express-async-errors");

app.use(express.json());
app.use(require("./controllers/middleware/headerSettings")); //set HTTP header settings
app.use(require("helmet")());
//route handlers
app.use("/api/clinics-search", require("./routes/search"));
// Error handlers and loggers
app.use(require("./controllers/middleware/errorHandler"));
app.use((err, req, res, next) => {
	log(err);
	// process.exit(1);
});

// Handle Uncaught Exceptions
process.on("unhandledRejection", (err) => {
	log(err);
	// process.exit(1);
});
process.on("uncaughtException", (err) => {
	log(err);
	// process.exit(1);
});

const port = process.env.PORT || 5500;
app.listen(port, () => {
	console.log(`server is listening on port ${port}`);
});
