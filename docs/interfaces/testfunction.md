# Interface: TestFunction

## Callable

▸ **TestFunction**(`title`: *string*, `fn`: [*Func*](func.md)): *void*

Describe a specification or test-case with the given `title` and callback `fn` acting as a thunk.

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | *string* |
| `fn` | [*Func*](func.md) |

**Returns:** *void*

## Table of contents

### Properties

- [skip](testfunction.md#skip)

## Properties

### skip

• **skip**: [*PendingTestFunction*](pendingtestfunction.md)

Indicates this test should not be executed.
