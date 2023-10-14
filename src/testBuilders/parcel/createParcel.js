import { expect } from "chai";
import { RequestHelper } from "../../helpers/requestHelper.js";
import { Constants } from "../../constants/constants.js";

let baseUrl;
let response;
let payload;

const constants = new Constants();
const endPoint = "/parcels";
const auth = {
  Authorization: "Bearer sk_test_XclolM6ke5rdVfdSmTEjzOTT8YLUNfbx",
};

export default class CreateParcel {
  constructor(context) {
    this.requestHelper = new RequestHelper(context);
    baseUrl = "https://sandbox.terminal.africa/v1";
  }

  createPayload(packaging_id, options = {}) {
    const default_item = {
      description: this.requestHelper.generateRandomDescription(),
      name: this.requestHelper.generateRandomString(8),
      type: constants.parcel_item_type.PARCEL,
      currency: constants.currency.NGN,
      value: this.requestHelper.generateRandomNumber(1000, 10000),
      quantity: this.requestHelper.generateRandomNumber(1, 5),
      weight: 0.5,
    };

    const default_vals = {
      items: [default_item],
      packaging: packaging_id,
      weight_unit: constants.weight_unit.KG,
      description: this.requestHelper.generateRandomDescription(),
    };

    payload = { ...default_vals, ...options };
    return payload;
  }

  async callCreateParcel(payload) {
    response = await this.requestHelper.sendPost(
      baseUrl,
      endPoint,
      auth,
      payload
    );
    this.requestHelper.logTest(response);
    return response;
  }

  verifyResponseData(response, payload) {
    //verify message
    const { message } = response;
    expect(message).to.equal("Parcel created successfully");

    //verify response
    const { data } = response;
    expect(data.description).to.equal(payload.description);
    expect(data).to.have.property("proof_of_payments");
    expect(data.packaging).to.equal(payload.packaging);
    if (payload.items.length == 1) {
      expect(data.total_weight).to.equal(payload.items[0].weight);
    } else {
      let weight = 0;
      for (let i = 0; i < payload.items.length; i++) {
        weight = weight + payload.item[i].weight;
      }
      expect(data.total_weight).to.equal(weight);
    }
    expect(data).to.have.property("user");
    expect(data.weight_unit).to.equal(payload.weight_unit);
    expect(data._id).to.not.be.empty;
    expect(data.parcel_id).to.not.be.empty;
    expect(data.created_at).to.not.be.empty;
    expect(data.updated_at).to.not.be.empty;
    expect(data.__v).to.not.be.null;
    expect(data).to.have.property("contains_perishables");
    if (payload.items.length == 1) {
      expect(data.total_value).to.equal(payload.items[0].value);
    } else {
      let value = 0;
      for (let i = 0; i < payload.items.length; i++) {
        value = value + payload.item[i].value;
      }
      expect(data.total_value).to.equal(value);
      expect(data.id).to.not.be.empty;
    }
  }
}
