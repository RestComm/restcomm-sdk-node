var nock = require("nock");
var Client = require("../lib/client");

var baseUrl = "https://cloud.restcomm.com/restcomm/2012-04-24/Accounts";

describe("Client", function () {

	var accountResponse = {
		Sid     : "fakeAccountSid",
		FriendlyName : "fakeFriendlyName"
	};

	before(function () {
		nock.disableNetConnect();
	});

	after(function () {
		nock.enableNetConnect();
	});

	describe("using default options", function () {
		var client;

		before(function () {
			client = new Client({
				accountSid   : "fakeAccountSid",
				apiToken : "fakeAuthToken"
			});

			nock(baseUrl)
				.persist()
				.get("/fakeAccountSid")
				.reply(200, accountResponse)
		});

		after(function () {
			nock.cleanAll();
		});

		it("should make requests to the default baseUrl", function () {
			return client.makeRequest({}).then(function (res) {
				res.body.should.eql(accountResponse);
			});
		});

	});
});
