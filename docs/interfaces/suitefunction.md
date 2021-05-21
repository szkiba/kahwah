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

## Properties

### skip

• **skip**: [*PendingSuiteFunction*](pendingsuitefunction.md)

Indicates this suite should not be executed.
