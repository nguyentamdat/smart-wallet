import { Dimensions } from "react-native";

const { HEIGHT, WIDTH } = Dimensions.get("window");

export default {
    container: {
        backgroundColor: "#FFF"
    },
    separator: {
        height: 45
    },
    separatorText: {
        textTransform: "uppercase",
        fontSize: 18,
        marginBottom: 3
    },
    labelItem: {
        marginLeft: 15,
        width: 30
    },
    moneyInputContainer: {
        marginLeft: 20,
        flex: 7
    },
    moneyInputText: {
        textAlign: "right"
    },
    currencyPicker: {
        flex: 3,
        alignSelf: "flex-end"
    },
    DatePickerStartContainer: {
        flex: 5
    },
    rowSeparator: {
        flex: 1
    },
    DatePickerEndContainer: {
        flex: 5
    },
    DateText: {
        fontSize: 18
    },
    footer: {
        backgroundColor: "#F0EFF5",
        flexDirection: "row",
        justifyContent: "space-between",
        height: 60,
        marginLeft: 10,
        marginRight: 10
    },
    footerButton: {
        alignSelf: "center"
    }
};
