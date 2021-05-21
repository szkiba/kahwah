# 🍵 Kahwah

Test runner for [k6](https://k6.io/). The design of the Kahwah library was inspired by Mocha. If you already know Mocha framework, using this library should be very simple.

## Features

 - [describe](docs/README.md#describe) and [it](docs/README.md#it) as you used to in Mocha
 - tests run serially and supports passing values between tests
 - connect tests as workfow test [step](docs/README.md#step)s
 - defines [thresholds](docs/README.md#thresholds) for test errors
 - measure [describe](docs/README.md#describe)/[step](docs/README.md#step) execution time and provide it as k6 metrics
 - published as [NPM package](https://www.npmjs.com/package/kahwah)
 - importable from CDN providers (ie: https://cdn.jsdelivr.net/npm/kahwah)
 - minified size is ~3k

## Documentation

More documentation will be coming soon, but until it is happen, here is an annotated example, and some generated API documentation in [docs/README.md](docs/README.md)

## Example

This section contains an annotated, runnable k6 example script. You can extract the script with [codedown](https://www.npmjs.com/package/codedown) and run with k6 using the following command line (as I do while testing documentation example):

```bash
cat README.md | codedown js | k6 run -
```

Or you can simply download [example.js](example.js) but it is much less fancy :)

In this example we are using [step](docs/README.md#step) function instead of [describe](docs/README.md#describe). The two function has exactly same API, the only difference is that [step](docs/README.md#step) will skip execution if previous step failed.

 1. Import latest release of Kahwah library from CDN (for example from jsDelivr)

    ```js
    import { describe as step, it } from "https://cdn.jsdelivr.net/npm/kahwah";
    ```

    As an alternative, you can import latest development version from GitHub

    ```JavaScript
    import { step, it } from "github.com/szkiba/kahwah/lib/index.js";
    ```

 2. Export [options](docs/README.md#options) and [default](docs/README.md#default) function from Kahwah library.

    ```js
    export { options, default } from "https://cdn.jsdelivr.net/npm/kahwah";
    ```

    You can export these as is (like in example above) or you can customize before exporting. The [options](docs/README.md#options) contains [thresholds](docs/README.md#thresholds) required to fail test if some of checks failed. The [thresholds](docs/README.md#thresholds) also available as exported variable, so you can import it (customize) and use in your own `options`.

 3. Import `expect` from [Chai Assertion Library](https://www.chaijs.com/)

    ```js
    import { expect } from "cdnjs.com/libraries/chai";
    ```

 4. Import required k6 packages

    ```js
    import http from "k6/http";
    ```

 5. Setup data object. In this example we are using a `session` context object to store session variables between steps.

    ```js
    export function setup() {
      return { session: {} };
    }
    ```

 6. Write workflow steps. Each step test some functionallity of the system. Some steps store output values to `session` variable for other steps.

```js
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
```

The output will be something like this:

```plain
     █ setup

     █ Generate random user

       ✓ status 200

     █ Generate access token

       ✓ status 200

     █ Get OpenID Configuration

       ✓ status 200
       ✓ has userinfo_endpoint

     █ Get User Info

       ✓ require authorization
       ✓ status 200
       ✓ has same property values
```

Each step/describe execution time is measured, the output will contains these `_duration` suffixed metrics (metric name prefix generated from step/describe title with lowercasing it and replacing spaces with underscore characters):

```plain
     checks..............................: 100.00% ✓ 7   ✗ 0  
     generate_access_token_duration......: avg=319ms    min=319ms   med=319ms    max=319ms    p(90)=319ms    p(95)=319ms   
     generate_random_user_duration.......: avg=348ms    min=348ms   med=348ms    max=348ms    p(90)=348ms    p(95)=348ms   
     get_openid_configuration_duration...: avg=38ms     min=38ms    med=38ms     max=38ms     p(90)=38ms     p(95)=38ms    
     get_user_info_duration..............: avg=528ms    min=528ms   med=528ms    max=528ms    p(90)=528ms    p(95)=528ms   
```
