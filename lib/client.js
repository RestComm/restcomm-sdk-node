var Promise = require("bluebird");
var request = Promise.promisify(require("request"));
var UnexpectedResponseError = require("./unexpectedResponseError");
var packageInfo = require("./../package.json");

var Client = function (config) {
	if (!config.baseUrl) {
		config.baseUrl = "https://cloud.restcomm.com/restcomm/2012-04-24/Accounts";
	}

	var handleResponse = function (response) {
		if (response.statusCode !== 200 && response.statusCode !== 201 && response.statusCode !== 202) {
			var message = "";
			if (response.body) {
				message = response.body.message || "";
			}
			throw new UnexpectedResponseError(message, response.statusCode);
		}
		return response;
	};

	function getUserAgentHeader() {
		return packageInfo.name + "-v" + packageInfo.version;
	}

	function createRequestOptions (params) {
		return {
			url                : config.baseUrl + "/" + config.accountSid + (params.path? "/" + params.path: ""),
			headers            : {
				"User-Agent" : getUserAgentHeader(),
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": Buffer.byteLength(params.body)
			},
			qs                 : params.qs,
			method             : params.method || "GET",
			auth               : {
                user: config.accountSid,
                pass: config.authToken
            },
			rejectUnauthorized : false, 
            json               : true, 
			encoding           : params.encoding || undefined
		};
	}
	this.makeRequest = function (params) {
		return request(createRequestOptions(params)).then(handleResponse);
	};
	this.createRequestOptions = createRequestOptions;
	this.handleResponse = handleResponse;
};

module.exports = Client;
