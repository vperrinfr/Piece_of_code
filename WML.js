'use strict';

function main(params) {
 const request = require('request-promise');

/* 
  Has to be changed regarding your model
  
*/
var GENDER = params.gender || "M";
var AGE = params.age || 33;
var MARITAL_STATUS = params.marital_status || "Married";
var PROFESSION = params.profession || "Retail";

var values = new Array(GENDER, AGE, MARITAL_STATUS, PROFESSION);  
var info = '{"fields": ["GENDER", "AGE", "MARITAL_STATUS", "PROFESSION"], "values": [["'+ GENDER +'",'+AGE+',"'+MARITAL_STATUS+'","'+PROFESSION+'"]]}';

var options = { 
  method: 'GET',
  url: 'https://ibm-watson-ml.mybluemix.net/v3/identity/token',
  json: true,
  headers: 
  { 
    authorization: 'Basic XXXXXXXXXXXXXXXXXXXXX' 
    }     
 };

var promise = request(options)
.then(function (body) {

  var auth = "Bearer " + body.token;
  var options2 = { method: 'POST',
  url: 'https://ibm-watson-ml.mybluemix.net/v3/wml_instances/XXXXXXXXXXXXXXXXXXXXX/published_models/XXXXXXXXXXXXXXXXXXXXX/deployments/XXXXXXXXXXXXXXXXXXXXX/online',
  headers: { authorization: auth },
  body: info };

	return options2
	})
.then(function (response) {
        return request(response);
	})
.then(function (response_final) {
        return JSON.parse(response_final);
    })
    .catch(function (err) {
	console.log(err);
    });

return promise;  
}
