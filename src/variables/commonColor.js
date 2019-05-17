import { Platform, Dimensions, PixelRatio } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = undefined;
const isIphoneX =
    platform === "ios" &&
    (deviceHeight === 812 ||
        deviceWidth === 812 ||
        deviceHeight === 896 ||
        deviceWidth === 896);

export default {
    platformStyle,
    platform,

    // Separator
    separatorBg: "#f0eff5",
    separatorText: "#777",

    // Footer
    footerDefaultBg: platform === "ios" ? "#F8F8F8" : "#3F51B5",

    // Texts
    subText: "#575757",
    inputPlaceholder: "#8c8c8c"
};
