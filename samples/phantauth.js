import { describe, it } from "../dist/index.js";
import { expect } from "https://cdnjs.cloudflare.com/ajax/libs/chai/4.3.4/chai.min.js";

import http from "k6/http";

export { options, default } from "../dist/index.js";

describe.step("Configuration", () => {
  let meta = http.get("https://phantauth.net/.well-known/oauth-authorization-server");

  it("status 200", () => {
    expect(meta.status).equal(200);
  });
});
