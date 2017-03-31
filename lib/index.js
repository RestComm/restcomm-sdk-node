var Client = require("./client");

/**
 * RestCp,,
 * @constructor
 * @param {Object} config - Client configuration parameters
 * @param {String} config.accountSid - Your Account Sid
 * @param {String} config.authToken - Your account auth token
 * @param {String} [config.baseUrl=https://cloud.restcomm.com/restcomm/2012-04-24/Accounts/] - The RestComm Cloud base url
 */
var RestCommClient = function (config) {
	var client = new Client(config);
};

module.exports = RestCommClient;