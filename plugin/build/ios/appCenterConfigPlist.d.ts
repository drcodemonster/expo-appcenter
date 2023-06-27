import { ConfigPlugin, XcodeProject } from "@expo/config-plugins";
export declare const withIosAppCenterConfigFile: ConfigPlugin<{
    relativePath: string;
}>;
export declare function setAppCenterConfigFile({ projectRoot, project, appCenterConfigFileRelativePath, }: {
    project: XcodeProject;
    projectRoot: string;
    appCenterConfigFileRelativePath: string;
}): XcodeProject;
