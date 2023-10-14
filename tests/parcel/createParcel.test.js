import { expect } from "chai";
import CreateParcel from "../../src/testBuilders/parcel/createParcel.js";
import CreatePackaging from "../../src/testBuilders/packaging/createPackaging.js";

let createParcel;
let createPackaging;
let response;
let payload;
let packaging_id;

describe("Create Packaging tests", function () {
  before(async function () {
    createParcel = new CreateParcel();
    createPackaging = new CreatePackaging(this);
    payload = createPackaging.createPayload();
   
    //packaging id is required to create parcel
    response = await createPackaging.callCreatePackaging(payload);
    packaging_id = response.body.data.packaging_id;
  });

  describe("Positive tests", function () {
    before(async function () {
      createParcel.requestHelper.setTestContext = this;
      payload = createParcel.createPayload(packaging_id);
      response = await createParcel.callCreateParcel(payload);
    });

    it("should verify response code and message", async function () {
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("Parcel created successfully");
    });

    it("should verify response data", async function () {
      response = response._body;
      createParcel.verifyResponseData(response, payload);
    });
  });
});
