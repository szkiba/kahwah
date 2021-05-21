import { describe as step, it } from "../lib/index.js";

export { options, default } from "../lib/index.js";

import { expect } from "cdnjs.com/libraries/chai";

import http from "k6/http";

export function setup() {
  return { session: {} };
}

step("Generate random user", (ctx) => {
  let resp = http.get("https://phantauth.net/user");

  it("status 200", () => {
    expect(resp.status).equal(200);
  });

  ctx.session.user = JSON.parse(resp.body);
});

step("Generate access token", (ctx) => {
  const { user } = ctx.session;
  let resp = http.get(`https://phantauth.net/user/${user.sub}/token/access`);

  it("status 200", () => {
    expect(resp.status).equal(200);
  });

  ctx.session.token = resp.body;
});

step("Get OpenID Configuration", (ctx) => {
  let resp = http.get("https://phantauth.net/.well-known/openid-configuration");

  it("status 200", () => {
    expect(resp.status).equal(200);
  });

  const parsed = JSON.parse(resp.body);

  it("has userinfo_endpoint", () => {
    expect(parsed).to.have.property("userinfo_endpoint");
  });

  ctx.session.meta = parsed;
});

step("Get User Info", (ctx) => {
  const { user, meta, token } = ctx.session;

  let resp;

  it("require authorization", () => {
    resp = http.get(meta.userinfo_endpoint);
    expect(resp.status).equal(401);
  });

  it("status 200", () => {
    resp = http.get(meta.userinfo_endpoint, { headers: { authorization: `Bearer ${token}` } });
    expect(resp.status).equal(200);
  });

  const info = JSON.parse(resp.body);

  it("has same property values", () => {
    ["sub", "name", "email", "picture"].forEach((prop) => expect(info[prop]).equal(user[prop]));
  });
});
