import React, { Component } from "react";
import { View, Separator } from "native-base";

import commonColor from "../../variables/commonColor";

export default class SeparatorCustom extends Component {
    render() {
        return (
            <View
                style={{
                    backgroundColor: commonColor.separatorBg,
                    height: 10
                }}
            />
        );
    }
}
