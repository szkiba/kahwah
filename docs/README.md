# kahwah

Kahwah is a test runner for [k6](https://k6.io/). The design of the Kahwah library was inspired by Mocha.
If you already know Mocha framework, using this library should be very simple.  Kahwah tests run serially and supports passing values between tests.
This makes it easy to connect tests as workfow test steps.

## Table of contents

### Interfaces

- [Context](interfaces/context.md)
- [Func](interfaces/func.md)
- [PendingSuiteFunction](interfaces/pendingsuitefunction.md)
- [PendingTestFunction](interfaces/pendingtestfunction.md)
- [SuiteFunction](interfaces/suitefunction.md)
- [TestFunction](interfaces/testfunction.md)
- [WorkflowStepFunction](interfaces/workflowstepfunction.md)

### Variables

- [describe](README.md#describe)
- [it](README.md#it)
- [options](README.md#options)
- [step](README.md#step)
- [thresholds](README.md#thresholds)

### Functions

- [context](README.md#context)
- [default](README.md#default)

## Variables

### describe

• `Const` **describe**: [*SuiteFunction*](interfaces/suitefunction.md)

Describe a "suite" with the given `title` and callback `fn` containing nested test-cases.

___

### it

• `Const` **it**: [*TestFunction*](interfaces/testfunction.md)

Describe a specification or test-case with the given `title` and callback `fn` acting as a thunk.

___

### options

• `Const` **options**: *object*

k6 options required for threshold handling.

___

### step

• `Const` **step**: [*SuiteFunction*](interfaces/suitefunction.md)

Describe a "suite" with the given `title` and callback `fn` containing nested test-cases. This suite should not be executed when any of previous steps are failed.

___

### thresholds

• `Const` **thresholds**: *object*

k6 thresholds.

## Functions

### context

▸ **context**(): [*Context*](interfaces/context.md)

Returns the actual suite's context variables.

**Returns:** [*Context*](interfaces/context.md)

___

### default

▸ **default**(`data?`: [*Context*](interfaces/context.md)): *void*

Default k6 function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data?` | [*Context*](interfaces/context.md) | initial suite context variables (return value from setup()) |

**Returns:** *void*
