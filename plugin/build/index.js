"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("@expo/config-plugins");
const android_1 = require("./android");
const ios_1 = require("./ios");
const DEFAULT_ANDROID_APP_CENTER_CONFIG_PATH = "appcenter/appcenter-config.json";
const DEFAULT_IOS_APP_CENTER_CONFIG_PATH = "appcenter/AppCenter-Config.plist";
/**
 * A config plugin for configuring `appcenter`
 */
const withAppCenter = (config, { androidAppCenterPath, iosAppCenterPath, androidOptions = {} } = {}) => {
    const resolvedAndroidConfigPath = androidAppCenterPath || DEFAULT_ANDROID_APP_CENTER_CONFIG_PATH;
    const resolvedIosConfigPath = iosAppCenterPath || DEFAULT_IOS_APP_CENTER_CONFIG_PATH;
    return (0, config_plugins_1.withPlugins)(config, [
        // iOS
        ios_1.withAppCenterAppDelegate,
        [
            ios_1.withIosAppCenterConfigFile,
            {
                relativePath: resolvedIosConfigPath,
            },
        ],
        // Android
        [android_1.withAppCenterStringsXML, androidOptions],
        [
            android_1.withAndroidAppCenterConfigFile,
            {
                relativePath: resolvedAndroidConfigPath,
            },
        ],
    ]);
};
exports.default = withAppCenter;
