import supertest from "supertest";
import { Chance } from "chance";

/**
 * coomon functions to make basic http calls
 */
let baseUrl;
let chanceObj;

export class RequestHelper {
  testContext;

  set setTestContext(value) {
    this.testContext = value;
  }

  constructor(context) {
    this.testContext = context;
    chanceObj = new Chance();
  }

  sendGet(url, endpoint, auth_header) {
    baseUrl = supertest(url);
    return baseUrl.get(endpoint).set(auth_header).send();
  }

  sendPost(url, endpoint, auth_header, payload) {
    baseUrl = supertest(url);
    return baseUrl.post(endpoint).set(auth_header).send(payload);
  }

  logTest(response) {
    //log request details
    console.log(
      "\nRequest : ",
      response.request.method + " " + response.request.url
    );
    console.log("\nPayload : ", response.request._data);
    //log response
    console.log("\nResponse : ", JSON.stringify(response.body, null, 2));
  }

  generateRandomString(length) {
    return chanceObj.word({ length });
  }

  generateRandomDescription() {
    return `${chanceObj.sentence({ words: 4 })}`.replace(".", "");
  }

  generateRandomNumber(min, max) {
    return chanceObj.integer({ min, max });
  }
}
