/**
 * 根据modules下的模块自动生成vuex的类型提示
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

const dir = fs.readdirSync(__dirname + "/modules");

const modules = dir.map((f) => f.replace(/.ts/, ""));

const imports = modules.map((module) => `import ${module} from "./modules/${module}";`).join("\n");
const stateTypes = modules.map((module) => `${module}: typeof ${module}.state;`).join("\n  ");
const mutationsTypes = modules.map((module) => `typeof ${module}.mutations`).join(" & ");
const actionsTypes = modules.map((module) => `typeof ${module}.actions`).join(" & ");
const gettersTypes = modules.map((module) => `typeof ${module}.getters`).join(" & ");

const stateTemplate = `
export type RootState = {
  ${stateTypes}
};`;
const mutationsTemplate = `export type Mutations = ${mutationsTypes};`;
const actionsTemplate = `export type Actions = ${actionsTypes};`;
const gettersTemplate = `export type Getters = ${gettersTypes};`;

const template = `\n${imports}\n${stateTemplate}\n${mutationsTemplate}\n${actionsTemplate}\n${gettersTemplate}\n`;

const typesFile = fs.readFileSync(__dirname + "/types.ts", { encoding: "utf8" });
const replace = typesFile.substring(typesFile.indexOf("/*start*/") + "/*start*/".length, typesFile.indexOf("/*end*/"));
const newFile = typesFile.replace(replace, template);

fs.writeFileSync(__dirname + "/types.ts", newFile);
