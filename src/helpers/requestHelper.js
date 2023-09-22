import supertest from "supertest";

/**
 * coomon functions to make basic http calls
 */
let baseUrl;

export class RequestHelper {
  testContext;

  set setTestContext(value) {
    this.testContext = value;
  }

  constructor(context) {
    this.testContext = context;
  }

  sendGet(url, endpoint, auth_header) {
    baseUrl = supertest(url);
    return baseUrl.get(endpoint).set(auth_header).send();
  }

  logTest(response) {
    //log request details
    console.log("\nRequest : ", response.request.method +" "+ response.request.url);
    console.log("\nPayload : ", response.request._data);
    //log response
    console.log("\nResponse : ", JSON.stringify(response.body, null, 2));
  }
}
