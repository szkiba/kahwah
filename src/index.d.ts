/**
 * Kahwah is a test runner for [k6](https://k6.io/). The design of the Kahwah library was inspired by Mocha.
 * If you already know Mocha framework, using this library should be very simple.  Kahwah tests run serially and supports passing values between tests.
 * This makes it easy to connect tests as workfow test steps.
 */

/**
 * Function parameter type for suite and test functions.
 *
 * @param ctx calling context variables
 * @returns `void`
 */
interface Func {
  (ctx: Context): void;
}

/**
 * Context contains suite context variables. Each suite has its own context. Suite context initial value come from kahwah module default function.
 */
interface Context extends Record<string, any> {}

/**
 * Describe a "suite" with the given `title` and callback `fn` containing nested test-cases. Indicates this suite should not be executed.
 *
 * @param title suite title
 * @param fn function containing nested test-cases
 * @returns `void`
 */
interface PendingSuiteFunction {
  (title: string, fn?: Func): void;
}

/**
 * Describe a "suite" with the given `title` and callback `fn` containing nested test-cases. This suite should not be executed when any of previous steps are failed.
 *
 * @param title suite title
 * @param fn function containing nested test-cases
 * @returns `void`
 */
interface WorkflowStepFunction {
  (title: string, fn?: Func): void;
}

interface SuiteFunction {
  /**
   * Describe a "suite" with the given `title` and callback `fn` containing nested test-cases.
   */
  (title: string, fn: (ctx: Context) => void): void;

  /**
   * Indicates this suite should not be executed.
   */
  skip: PendingSuiteFunction;

  /**
   * Indicates this suite is a step of workflow suite and should not be executed when any of previous steps are failed.
   */
  step: WorkflowStepFunction;
}

interface TestFunction {
  /**
   * Describe a specification or test-case with the given `title` and callback `fn` acting as a thunk.
   */
  (title: string, fn: Func): void;

  /**
   * Indicates this test should not be executed.
   */
  skip: PendingTestFunction;
}

interface PendingTestFunction {
  /**
   * Describe a specification or test-case with the given `title` and callback `fn` acting as a thunk. Indicates this test should not be executed.
   */
  (title: string, fn?: Func): void;
}

/**
 * Describe a "suite" with the given `title` and callback `fn` containing nested test-cases.
 */
export declare const describe: SuiteFunction;

/**
 * Describe a specification or test-case with the given `title` and callback `fn` acting as a thunk.
 */
export declare const it: TestFunction;

/**
 * Returns the actual suite's context variables.
 */
export function context(): Context;

/**
 * k6 options required for threshold handling.
 */
export declare const options: object;

/**
 * k6 thresholds.
 */
export declare const thresholds: object;

/**
 * Default k6 function.
 *
 * @param ctx initial suite context variables (return value of setup())
 */
export default function (ctx?: Context): void;
