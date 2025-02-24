import React from "react";

import {Text, View, StyleSheet, Pressable} from "react-native";

import Colors from "../constants/Colors";

type PrimaryButtonProps = {
    children: React.ReactNode;
    onPress: () => void;
}

function PrimaryButton(props: PrimaryButtonProps) {
    return (
        <View style={styles.outerContainer}>
            <Pressable style={styles.container} onPress={props.onPress} android_ripple={{color: Colors.primary600}}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: "hidden",
    },
    container: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText: {
        color: "white",
        textAlign: "center"
    }
})

export default PrimaryButton;