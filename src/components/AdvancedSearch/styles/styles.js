import { StyleSheet } from "react-native";

const GlobalStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%"
    },
    header: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flex: 2
    },
    filterList: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 8.5,
        width: "100%",
        marginTop: 30
    },
    buttonContainer: {
        width: "100%"
    },
    buttons: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        height: 75,
        borderWidth: 3,
        borderRadius: 25,
        borderColor: "#666666"
    },
    buttonText: {
        fontSize: 30,
        color: "#000000"
    },
    content: {
        flexDirection: "column",
        justifyContent: "flex-start",
        flex: 8,
        width: "100%",
        marginTop: 20
    },
    textStyleContent: {
        fontSize: 25,
        fontStyle: "italic"
    },
    textStyleInput: {
        fontSize: 20,
        fontStyle: "italic",
        textAlign: "right",
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 10,
        paddingLeft: 10
    },
    ListBox: {
        marginLeft: 10,
        marginRight: 10
    }
});

export default GlobalStyles;
