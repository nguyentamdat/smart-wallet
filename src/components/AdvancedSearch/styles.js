import variables from "../../variables/platform";

export default {
    container: {
        backgroundColor: "#FFF"
    },
    stableArea: {
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 60,
        paddingLeft: 10,
        paddingRight: 10
    },
    touchableOpacityRow: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        flex: 1,
        height: "100%"
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
        width: 50
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
        alignItems: "center",
        height: 60,
        paddingLeft: 10,
        paddingRight: 10
    },
    footerButton: {
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    iconListItem: {
        marginLeft: 0,
        paddingLeft: 0,
        width: 65
    }
};
