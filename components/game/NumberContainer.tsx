import {StyleSheet, Text, View} from "react-native";
import Colors from "../../constants/Colors";
import React from "react";

type Props = {
    children: React.ReactNode;
}

function NumberContainer({children}: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.numberText}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.accent500,
        padding: 24,
        margin: 24,
        borderRadius: 8,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    numberText: {
        color: Colors.accent500,
        fontSize: 36,
        fontWeight: "bold",
    }
})

export default NumberContainer;