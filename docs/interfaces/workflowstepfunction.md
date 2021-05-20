# Interface: WorkflowStepFunction

Describe a "suite" with the given `title` and callback `fn` containing nested test-cases. This suite should not be executed when any of previous steps are failed.

## Callable

▸ **WorkflowStepFunction**(`title`: *string*, `fn?`: [*Func*](func.md)): *void*

Describe a "suite" with the given `title` and callback `fn` containing nested test-cases. This suite should not be executed when any of previous steps are failed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `title` | *string* | suite title |
| `fn?` | [*Func*](func.md) | function containing nested test-cases |

**Returns:** *void*

`void`
