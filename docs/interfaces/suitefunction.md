# Interface: SuiteFunction

## Callable

▸ **SuiteFunction**(`title`: *string*, `fn`: (`ctx`: [*Context*](context.md)) => *void*): *void*

Describe a "suite" with the given `title` and callback `fn` containing nested test-cases.

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | *string* |
| `fn` | (`ctx`: [*Context*](context.md)) => *void* |

**Returns:** *void*

## Table of contents

### Properties

- [skip](suitefunction.md#skip)
- [step](suitefunction.md#step)

## Properties

### skip

• **skip**: [*PendingSuiteFunction*](pendingsuitefunction.md)

Indicates this suite should not be executed.

___

### step

• **step**: [*WorkflowStepFunction*](workflowstepfunction.md)

Indicates this suite is a step of workflow suite and should not be executed when any of previous steps are failed.
