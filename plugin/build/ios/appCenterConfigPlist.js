"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAppCenterConfigFile = exports.withIosAppCenterConfigFile = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const Paths_1 = require("@expo/config-plugins/build/ios/Paths");
const Xcodeproj_1 = require("@expo/config-plugins/build/ios/utils/Xcodeproj");
const fs = require("fs");
const path = require("path");
const withIosAppCenterConfigFile = (config, { relativePath }) => {
    return (0, config_plugins_1.withXcodeProject)(config, (config) => {
        config.modResults = setAppCenterConfigFile({
            projectRoot: config.modRequest.projectRoot,
            project: config.modResults,
            appCenterConfigFileRelativePath: relativePath,
        });
        return config;
    });
};
exports.withIosAppCenterConfigFile = withIosAppCenterConfigFile;
function setAppCenterConfigFile({ projectRoot, project, appCenterConfigFileRelativePath, }) {
    const appCenterConfigFilePath = path.resolve(projectRoot, appCenterConfigFileRelativePath);
    fs.copyFileSync(appCenterConfigFilePath, path.join((0, Paths_1.getSourceRoot)(projectRoot), "AppCenter-Config.plist"));
    const projectName = (0, Xcodeproj_1.getProjectName)(projectRoot);
    const plistFilePath = `${projectName}/AppCenter-Config.plist`;
    if (!project.hasFile(plistFilePath)) {
        project = (0, Xcodeproj_1.addResourceFileToGroup)({
            filepath: plistFilePath,
            groupName: projectName,
            project,
            isBuildFile: true,
        });
    }
    return project;
}
exports.setAppCenterConfigFile = setAppCenterConfigFile;
