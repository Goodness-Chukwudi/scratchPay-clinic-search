# INTRODUCTION

scratchPay-clinic-search is RESTful API endpoint built with Node JS, express and tested with Jest test suite.

It provides an endpoint to allow search in multiple clinic providers and display results from all the available clinics by any of the following: Clinic Name, State [ex: "CA" or "California"], Availability [ex: from:09:00, to:20:00].

The endpoint accepts a request body that looks like this
{
"clinicType": "Vet",
"searchCriteria": {
"clinicName": "pet",
"state": ["California", "CA"],
"time": "10:00"
}
}
and returns a response object containing a list of matching clinics that looks like
{
"vetClinics": [
{
"clinicName": "Scratchpay Test Pet Medical Center",
"stateCode": "CA",
"opening": {
"from": "00:00",
"to": "24:00"
}
}
]
}

To reduce lag in case of large data set of clinic providers, every request comes with the clinic type to search for. This will help prevent unnecessary search in the two datasets and reduce processing time by half.

To specify the clinicType, assing either "Dental" or "Vet" to the clinicType attribute of the request body.
The state attribute takes an array of a state name and it's code.
The time attribute which specifies the preferred appointment time, takes only a string of hour and minutes part of a time. Formats like "10:30", "10", "1:25Pm" are valid while "ten pm", "8:30am" wont have effect on the result. A wrong time input would not filter with time.

# Assumptions...

1. I assumed that no user will be allowed to take an appointment time that is the exact closing time of the clinic, therefore search results wouldn't include clinics whose closing time is exactly the preferred appointment time. It should be earlier than the closing time.

2. I assumed that the state name and code provided for the search and the state name or code provided in the dataset of clinic providers are the same case. That means unlike clinic name search (done with regex) our state search is case sensitive. CA wouldn't match Ca.

# SECURITY

helmet Js was used to set necessary security headers.
A header setting module in the app also sets the Access-Control-Allow-Origin to a prticular domain to control access to the endpoint.
I used joi to validate input against some unwanted formats that might crash the app at runtime.
I also used xss package to sanitize the search inputs

# TESTING

I employed a TDD approach for the project and used Jest for my test.
I modified my .gitignore to allow the test coverage file (coverage/lcov-report/index.html) that provides the metrics of the test coverage.

Please note, I built an interface with some front-end vanilla JS to interact with the endpoint. If that is fine and you will want to take a look, I will push it to this repo.

Thank you.

# Author

Chukwudi Ibeche
