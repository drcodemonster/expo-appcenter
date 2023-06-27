import { ConfigPlugin } from "@expo/config-plugins";
import { AndroidProps } from "./android";
interface PluginProps {
    /**
     * Custom location of `appcenter-config.json`,
     * relative to project root
     */
    androidAppCenterPath?: string;
    /**
     * Custom location of `AppCenter-Config.plist`,
     * relative to project root
     */
    iosAppCenterPath?: string;
    androidOptions?: AndroidProps;
}
/**
 * A config plugin for configuring `appcenter`
 */
declare const withAppCenter: ConfigPlugin<PluginProps>;
export default withAppCenter;
