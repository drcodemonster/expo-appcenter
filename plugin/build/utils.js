"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withCopyFile = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const fs = require("fs/promises");
const path = require("path");
const withCopyFile = (config, { platform, from, to }) => (0, config_plugins_1.withDangerousMod)(config, [
    platform,
    async (config) => {
        const srcPath = path.resolve(config.modRequest.projectRoot, from);
        const destPath = path.resolve(config.modRequest.platformProjectRoot, to);
        const folder = path.dirname(destPath);
        const folderExists = await fileExists(folder);
        if (!folderExists) {
            await fs.mkdir(folder, { recursive: true });
        }
        await fs.copyFile(srcPath, destPath);
        return config;
    },
]);
exports.withCopyFile = withCopyFile;
async function fileExists(filename) {
    try {
        await fs.access(filename);
        return true;
    }
    catch (err) {
        if (err.code === "ENOENT") {
            return false;
        }
        else {
            throw err;
        }
    }
}
