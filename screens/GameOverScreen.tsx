import {Animated, StyleSheet, Text, View} from "react-native";
import Title from "../components/Title";
import Image = Animated.Image;
import Colors from "../constants/Colors";
import PrimaryButton from "../components/PrimaryButton";

type Props = {
    onNewGame: () => void;
    rounds: number;
    userNumber: number;
}

function GameOverScreen({userNumber, rounds, onNewGame}: Props) {
    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Title style={{marginBottom: 24}}>Game Over</Title>
            <View style={styles.imageContainer}>
                <Image
                    style={{width: '100%', height: '100%'}}
                    source={require("../assets/images/success.png")}/>
            </View>
            <Text style={styles.text}>Your phone needed <Text style={styles.highlightText}>{rounds}</Text> rounds to get
                the
                number <Text style={styles.highlightText}>{userNumber}</Text>.</Text>
            <View style={{marginTop: 12}}>
                <PrimaryButton onPress={onNewGame}>
                    New Game
                </PrimaryButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        borderRadius: 100,
        borderWidth: 4,
        borderColor: Colors.primary800,
        height: 200,
        overflow: "hidden",
        width: 200,
    },
    text: {
        fontSize: 24,
        fontFamily: "open-sans",
        marginTop: 16,
        textAlign: "center",
    },
    highlightText: {
        color: Colors.primary500,
        fontFamily: "open-sans-bold",
    }
})

export default GameOverScreen;