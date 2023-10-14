import { expect } from "chai";
import { RequestHelper } from "../../helpers/requestHelper.js";
import { Constants } from "../../constants/constants.js";

let baseUrl;
let response;
let payload;

const constants = new Constants();
const endPoint = "/packaging";
const auth = {
  Authorization: "Bearer sk_test_XclolM6ke5rdVfdSmTEjzOTT8YLUNfbx",
};

export default class CreatePackaging {
  constructor(context) {
    this.requestHelper = new RequestHelper(context);
    baseUrl = "https://sandbox.terminal.africa/v1";
  }

  /**
   *
   * @param {*} options
   * @param {number} height - height of packaging
   * @param {number} length - length of packaging
   * @param {string} name - name of packaging
   * @param {string} size_unit - unit size of packaging (cm only)
   * @param {string} type - box, envelope, soft-packaging
   * @param {number} width - width of packaging in cm
   * @param {number} weight - weight of packaging
   * @param {string} weight_unit - weight unit of packaging (km only)
   * @returns {object}
   */
  createPayload(options = {}) {
    const default_vals = {
      height: 30,
      length: 30,
      name: this.requestHelper.generateRandomString(8),
      size_unit: constants.size_unit.CM,
      type: constants.packaging_type.BOX,
      width: 10,
      weight: 1,
      weight_unit: constants.weight_unit.KG,
    };

    payload = { ...default_vals, ...options };
    return payload;
  }

  async callCreatePackaging(payload) {
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
    expect(message).to.equal("Packaging Created Successfully");

    //verify response
    const { data } = response;
    expect(data).to.have.property("default");
    expect(data.height).to.equal(payload.height);
    expect(data.length).to.equal(payload.length);
    expect(data.name).to.equal(payload.name);
    expect(data.size_unit).to.equal(payload.size_unit);
    expect(data.type).to.equal(payload.type);
    expect(data).to.have.property("user");
    expect(data.weight).to.equal(payload.weight);
    expect(data.weight_unit).to.equal(payload.weight_unit);
    expect(data.width).to.equal(payload.width);
    expect(data._id).to.not.be.empty;
    expect(data.packaging_id).to.not.be.empty;
    expect(data.created_at).to.not.be.empty;
    expect(data.updated_at).to.not.be.empty;
    expect(data.__v).to.not.be.null;
    expect(data._id).to.equal(data._id);
  };

  
}
