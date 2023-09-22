import { expect } from "chai";
import GetCarriers from "../src/testBuilders/getCarriers.js";

let getCarriers;
let response;

describe("Get Carriers tests", function () {
  before(async function () {
    getCarriers = new GetCarriers();
  });

  describe("Positive tests", function () {
    before(async function () {
      getCarriers.requestHelper.setTestContext = this;
      response = await getCarriers.callGetCarriers();
    });

    it("should verify response code and message", async function () {
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("Carriers retrieved successfully");
    });

    it("should verify response data", async function () {
      response = response._body;
      getCarriers.verifyResponseData(response);
    });
  });
});
