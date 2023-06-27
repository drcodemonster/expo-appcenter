"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAndroidAppCenterConfigFile = void 0;
const utils_1 = require("../utils");
const constants_1 = require("./constants");
/**
 * Copy `appcenter-config.json`
 */
const withAndroidAppCenterConfigFile = (config, { relativePath }) => {
    try {
        return (0, utils_1.withCopyFile)(config, {
            platform: "android",
            from: relativePath,
            to: constants_1.DEFAULT_TARGET_PATH,
        });
    }
    catch (e) {
        throw new Error(`Cannot copy appcenter-config.json, because the file ${relativePath} doesn't exist. 
      Please provide a valid path in \`app.json\`.`);
    }
};
exports.withAndroidAppCenterConfigFile = withAndroidAppCenterConfigFile;
