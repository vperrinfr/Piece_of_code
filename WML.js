'use strict';

function main(params) {
 const request = require('request-promise');
 const btoa = require("btoa");
/*
var params={
	GENDER:"M",
	AGE:33,
	MARITAL_STATUS:"Married",
	PROFESSION:"Retail"
};*/

var wml_username = "XXXX";
var wml_password = "XXXX";
var wml_url = "https://ibm-watson-ml.mybluemix.net"
const tokenUrl = wml_url + "/v3/identity/token";

/* 
  Has to be changed regarding your model.
*/
var GENDER = params.gender || "M";
var AGE = params.age || 33;
var MARITAL_STATUS = params.marital_status || "Married";
var PROFESSION = params.profession || "Retail";

var values = new Array(GENDER, AGE, MARITAL_STATUS, PROFESSION);
var info = '{"fields": ["GENDER", "AGE", "MARITAL_STATUS", "PROFESSION"], "values": [["'+ GENDER +'",'+AGE+',"'+MARITAL_STATUS+'","'+PROFESSION+'"]]}';


const tokenHeader = "Basic " + btoa((wml_username + ":" + wml_password));
var options = { method: 'GET',
url: tokenUrl,
json: true,
headers: 
 { authorization: tokenHeader }     
};

var promise = request(options)
    .then(function (body) {
		var auth = "Bearer " + body.token;
        var options2 = { method: 'POST',
  url: 'XXX', headers: 
   { 
     authorization: auth },
  body: info };

	    return options2
	})
	.then(function (repos) {
		console.log(repos);
        return request(repos);
	})
	.then(function (repos2) {
		console.log(repos2);
        return JSON.parse(repos2);
    })
    .catch(function (err) {
		console.log(err);
    });

return promise;  
}
