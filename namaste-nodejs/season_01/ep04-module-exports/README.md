# Module Management

- By default, modules protected their variables and functions from leakage to avoid conflict with other modules.
- We have to explicitly export those to make them available in other modules to be used.
- There are two patterns which can be followed for modules management:-

| CommonJS Modules `.cjs`                  | ES6 Modules `.mjs`           |
| ---------------------------------------- | ---------------------------- |
| Older way                                | Newer Way                    |
| `require()` and `modules.exports` syntax | `import` and `export` syntax |
| Synchronous Loading                      | Asynchronous Loading         |
| Default in NodeJS                        | Default in Angular, Loopback |
| Non Strict mode                          | Strict Mode                  |

> `module.exports` is an `{}` empty object by default
