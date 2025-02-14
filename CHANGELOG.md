This file explains how Visual Studio created the project.

The following tools were used to generate this project:

- TypeScript Compiler (tsc)

The following steps were used to generate this project:

- Create project file (`Content.Source.esproj`).
- Create `launch.json` to enable debugging.
- Create `nuget.config` to specify location of the JavaScript Project System SDK (which is used in the first line in
  `Content.Source.esproj`).
- Install npm packages and create `tsconfig.json`:
  `npm init && npm i --save-dev eslint typescript @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser && npx tsc --init --sourceMap true`.
- Create `app.ts`.
- Update `package.json` entry point.
- Update TypeScript build scripts in `package.json`.
- Create `.eslintrc.json` to enable linting.
- Add project to solution.
- Write this file.
