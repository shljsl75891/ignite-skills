# Creating Express Server

#### What are `node_modules` ?

![meme](/assets/2025-02-01-16-35-46.png)

It is a folder in project, in which all transitive dependencies source code resides. In large projects, this become very huge (heaviest thing in the universe XD). It must not be pushed on github, as they can be easily generated using `package.json` and `package-lock.json`.

###### What is `.bin` in `node_modules` ?

```txt
../
./
_mocha@	 --> /home/sahil.jassal/personal/my-project/node_modules/mocha/bin/_mocha
browserslist@	 --> /home/sahil.jassal/personal/my-project/node_modules/browserslist/cli.js
eslint-config-prettier@	 --> /home/sahil.jassal/personal/my-project/node_modules/eslint-config-prettier/bin/cli.js
eslint@	 --> /home/sahil.jassal/personal/my-project/node_modules/eslint/bin/eslint.js
prettier@	 --> /home/sahil.jassal/personal/my-project/node_modules/prettier/bin/prettier.cjs
uuid@	 --> /home/sahil.jassal/personal/my-project/node_modules/uuid/dist/bin/uuid
....
```

It is a directory in `node_modules` which contains symbolic links to command line executables of our dependencies (`prettier`, `eslint` etc). So, that we can easily run them without mentioning the absolute path of executables directly as well as through `npm` scripts.

#### How `npm` versions semantics work ?

`<Major>.<Minor>.<Patch>`

- If any bug fix is done, the last bit is updated in package version. It is safer to update patch versions.
- If any backward-compatible feature is added, the middle bit is updated in package version.
- If any breaking changes are introduced, the first bit is updated in package version.

#### What is the difference between `^` and `~`?

- `^ (caret)` represents that the package can automatically be updated to latest minor version.
- `~ (tilde)` represents that the package can automatically be updated to latest patch version.

#### What is the difference between `package.json` and `package-lock.json` ?

- `package.json` - represents project `npm` configurations, scripts, overrides, lists all dependencies with versions etc.
- `package-lock.json` - represents with exaclty which versions of the dependencies, the project works perfectly. It also represents the transitive dependencies tree in `json` structure which exact installed versions. It must be pushed to github to ensure the project works perfectly in any environment.
