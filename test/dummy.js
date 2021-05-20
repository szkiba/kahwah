import { describe, it } from "../dist/index.js";
import { expect } from "https://cdnjs.cloudflare.com/ajax/libs/chai/4.3.4/chai.min.js";

export { options, default } from "../dist/index.js";

export function setup() {
  return { foo: 42 };
}

describe("dummy", (ctx) => {
  const { foo } = ctx;

  it("answer should be 42", () => {
    expect(foo).equal(42);
  });
});
