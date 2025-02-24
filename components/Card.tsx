import {StyleSheet, View} from "react-native";
import Colors from "../constants/Colors";
import React from "react";

type Props = {
    children: React.ReactNode;
}

function Card({children}: Props) {
    return (
        <View style={styles.cardContainer}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        alignItems: 'center',
        padding: 16,
        marginHorizontal: 24,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4,
    }
})

export default Card;