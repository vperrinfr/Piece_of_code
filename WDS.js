
  /**
  *
  * main() will be invoked when you Run This Action
  *
  * @param environment_id => Watson Discovery Environment ID
  * @param collection_id => Watson Discovery collection ID
  * @param input => User Text input
  * @param url => Watson Gateway URL
  * @param authorization "Basic + Base64"
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
  
function main(params) {
    var request = require('request');;
    var environment_id = params.environment_id;
    var collection_id = params.collection_id ;
    var input = params.input;
    var url = params.url || 'https://gateway.watsonplatform.net';
    var authorization = params.authorization;
    
    var qs=
     { version: '2017-09-01',
       count: '1',
       passages: 'true',
       natural_language_query: input };
    
    console.log("QS :" + JSON.stringify(qs,null,2));
    
    var promise = new Promise(function(resolve, reject) {request(
    { method: 'GET',
    url: url + '/discovery/api/v1/environments/'+environment_id+'/collections/'+collection_id+'/query',
    qs,
    headers: 
     { 
       authorization: authorization }
     },
       function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var j = JSON.parse(body);
                resolve(j);
            } else {
                console.log('body:', body);
                reject({
                    error: error,
                    response: response,
                    body: body
                });
            }
        });
    });
  
    return promise
  }
