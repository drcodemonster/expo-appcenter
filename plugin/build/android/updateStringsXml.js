"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAppCenterStringsXML = void 0;
const config_plugins_1 = require("@expo/config-plugins");
/**
 * Update `res/values/strings.xml` by adding appcenter config strings
 */
const withAppCenterStringsXML = (config) => {
    return (0, config_plugins_1.withStringsXml)(config, (config) => {
        config.modResults = setStrings(config.modResults, "appCenterCrashes_whenToSendCrashes", "DO_NOT_ASK_JAVASCRIPT");
        config.modResults = setStrings(config.modResults, "appCenterAnalytics_whenToEnableAnalytics", "ALWAYS_SEND");
        return config;
    });
};
exports.withAppCenterStringsXML = withAppCenterStringsXML;
function setStrings(strings, name, value) {
    // Helper to add string.xml JSON items or overwrite existing items with the same name.
    return config_plugins_1.AndroidConfig.Strings.setStringItem([
        // XML represented as JSON
        //   { $: { name: 'expo_custom_value', translatable: 'false' }, _: value },
        { $: { name, translatable: "false" }, _: value },
    ], strings);
}
