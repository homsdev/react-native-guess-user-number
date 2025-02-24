import {StyleProp, StyleSheet, Text, TextStyle} from "react-native";
import React from "react";

type Props = {
    children: React.ReactNode;
    style?: StyleProp<TextStyle>;
}

function Instruction({children, style}: Props) {
    return (
        <Text style={[styles.text, style]}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "open-sans",
        color: "white",
        fontSize: 18,
    }
})

export default Instruction;