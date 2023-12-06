"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAppCenterAppDelegate = exports.modifyObjcAppDelegate = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const fs = require("fs/promises");
const methodInvocationBlock = `[AppCenterReactNative register];
  [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];
  [AppCenterReactNativeCrashes registerWithAutomaticProcessing];`;
function modifyObjcAppDelegate(contents) {
    // Add import
    if (!contents.includes("#import <AppCenterReactNative.h>")) {
        contents = contents.replace(/#import "AppDelegate.h"/g, `#import "AppDelegate.h"
#import <AppCenterReactNative.h>
#import <AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNativeCrashes.h>`);
    }
    // Add invocation
    if (!contents.includes(methodInvocationBlock)) {
        contents = contents.replace(/return\ \[super application\:application didFinishLaunchingWithOptions\:launchOptions\]/g, `${methodInvocationBlock}

  return [super application:application didFinishLaunchingWithOptions:launchOptions]`);
    }
    return contents;
}
exports.modifyObjcAppDelegate = modifyObjcAppDelegate;
const withAppCenterAppDelegate = (config) => {
    return (0, config_plugins_1.withDangerousMod)(config, [
        "ios",
        async (config) => {
            const fileInfo = config_plugins_1.IOSConfig.Paths.getAppDelegate(config.modRequest.projectRoot);
            let contents = await fs.readFile(fileInfo.path, "utf-8");
            if (fileInfo.language === "objc" || fileInfo.language === "objcpp") {
                contents = modifyObjcAppDelegate(contents);
            }
            else {
                // TODO: Support Swift
                throw new Error(`Cannot add AppCenter code to AppDelegate of language "${fileInfo.language}"`);
            }
            await fs.writeFile(fileInfo.path, contents);
            return config;
        },
    ]);
};
exports.withAppCenterAppDelegate = withAppCenterAppDelegate;
