import { expect } from "chai";
import { RequestHelper } from "../../helpers/requestHelper.js";

let baseUrl;
let response;

const endPoint = "/carriers";
const auth = {
  Authorization: "Bearer sk_test_XclolM6ke5rdVfdSmTEjzOTT8YLUNfbx",
};

export default class GetCarriers {
  constructor(context) {
    this.requestHelper = new RequestHelper(context);
    baseUrl = "https://sandbox.terminal.africa/v1";
  }

  async callGetCarriers() {
    response = await this.requestHelper.sendGet(baseUrl, endPoint, auth);
    this.requestHelper.logTest(response);
    return response;
  }

  verifyResponseData(response) {
    //verify message
    const { message } = response;
    expect(message).to.equal("Carriers retrieved successfully");

    //verify carriers
    const { carriers } = response.data;
    carriers.forEach((carrier) => {
      expect(carrier.active).to.not.be.null;
      expect(carrier.name).to.not.be.empty;
      expect(carrier.carrier_id).to.not.be.empty;
      expect(carrier.created_at).to.not.be.empty;
    });
  }
}
