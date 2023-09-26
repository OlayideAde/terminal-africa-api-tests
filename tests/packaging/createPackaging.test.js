import { expect } from "chai";
import CreatePackaging from "../../src/testBuilders/packaging/createPackaging.js";

let createPackaging;
let response;
let payload;

describe("Create Packaging tests", function () {
    before(async function () {
        createPackaging = new CreatePackaging();
    });
  
    describe("Positive tests", function () {
      before(async function () {
        createPackaging.requestHelper.setTestContext = this;
        payload = createPackaging.createPayload();
        //console.log(payload);
        response = await createPackaging.callCreatePackaging(payload);
      });
  
      it("should verify response code and message", async function () {
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal("Packaging Created Successfully");
      });
  
      it("should verify response data", async function () {
        response = response._body;
        createPackaging.verifyResponseData(response, payload);
      });
    });
  });