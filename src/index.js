/**
 * MIT License
 *
 * Copyright (c) 2021 Iván Szkiba
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { check, group, sleep } from "k6";
import { Counter, Trend } from "k6/metrics";
import createContext from "context";

export const thresholds = {};
export const options = { thresholds };

class Step {
  constructor(title, fn, workflow, skip) {
    this.skip = skip;
    this.title = title;
    this._fn = fn;
    this.id = title.replace(/[ -]/g, "_").toLowerCase();
    this.errors = new Counter(this.id + "_errors");
    this.durations = new Trend(this.id + "_duration", true);
    this.exceptions = [];
    thresholds[this.id + "_errors"] = ["rate==0"];
    this.workflow = workflow;
  }

  run(ctx) {
    if (this.skip) {
      group(`∅ ${this.title}`, () => {});
      return;
    }

    const start = Date.now();
    group(this.title, () => {
      try {
        this._fn(ctx);
      } catch (e) {
        this.errors.add(1);
        this.exceptions.push(e);
      } finally {
        this.durations.add(Date.now() - start);
      }
    });
  }
}

export class Flow {
  constructor(title) {
    this.title = title;
    this.id = title ? title.replace(/[ -]/g, "_").toLowerCase() : "";
    this.prefix = this.id ? `${this.id}_` : "";
    this.context = createContext();
    this.steps = [];
  }

  _newStep(title, fn, tolerant, skip) {
    return new Step(this.prefix + title, fn, tolerant, skip);
  }

  step(title, fn) {
    this.steps.push(this._newStep(title, fn, true));
  }

  skip(title) {
    this.steps.push(this._newStep(title, null, false, true));
  }

  suite(title, fn) {
    this.steps.push(this._newStep(title, fn, false));
  }

  run(vars) {
    if (this.id) {
      group(this.title, () => this._run(vars));
    } else {
      this._run(vars);
    }
  }

  _run(vars) {
    let success = true;
    this.context.run(vars, (ctx) => {
      for (const step of this.steps) {
        if (!success && step.workflow) {
          continue;
        }
        this.context.run({ step: step }, (ctx) => step.run(ctx));
        if (step.exceptions.length > 0) {
          if (step.workflow) {
            success = false;
          }
          for (const e of step.exceptions) {
            console.error(e);
          }
        }

        if (ctx.sleep) {
          sleep(ctx.sleep);
        }
      }
    });
  }

  it(title, fn) {
    const { step } = this.context.use();
    let success, err;
    try {
      fn();
      success = true;
    } catch (e) {
      step.exceptions.push(e);
      step.errors.add(1);
    } finally {
      if (success) {
        check(null, { [title]: true });
      } else {
        check(null, { [`${title} (${err})`]: false });
      }
    }
  }
}

const flow = new Flow();

export const describe = (title, fn) => flow.suite(title, fn);
describe.skip = (title, fn) => flow.skip(title, fn);
describe.step = (title, fn) => flow.step(title, fn);

export const it = (title, fn) => flow.it(title, fn);
it.skip = () => {};

export const context = () => flow.context.use();

export default (vars) => flow.run(vars);
