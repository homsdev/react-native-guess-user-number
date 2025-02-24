import {useState} from "react";

import {StatusBar} from 'expo-status-bar';
import {ImageBackground, StyleSheet, SafeAreaView} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {useFonts} from "expo-font";

import StartGameScreen from "./screens/StartGameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/Colors";

export default function App() {

    const [userNumber, setUserNumber] = useState<number>(0);
    const [gameOver, setGameOver] = useState(false);
    const [rounds, setRounds] = useState(0);

    const [fontLoaded] = useFonts({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });

    function pickedNumberHandler(pickedNumber: number) {
        setUserNumber(pickedNumber)
    }

    function gameOverHandler(rounds: number) {
        setGameOver(true);
        setRounds(rounds);
    }

    function startNewGameHandler() {
        setUserNumber(0)
        setRounds(0)
        setGameOver(false);
    }

    return (
        <LinearGradient
            colors={[
                Colors.primary600,
                Colors.accent500,
            ]}
            style={styles.rootScreen}>
            <ImageBackground
                source={require("./assets/images/background.png")}
                resizeMode="cover"
                style={styles.rootScreen}
                imageStyle={{opacity: 0.15}}
            >
                <SafeAreaView style={styles.rootScreen}>
                    {userNumber > 0 && !gameOver? <GameScreen onGameOver={gameOverHandler} userNumber={userNumber}/> :
                        !gameOver && <StartGameScreen onPickNumber={pickedNumberHandler}/>}
                    {gameOver ? <GameOverScreen
                            onNewGame={startNewGameHandler}
                            rounds={rounds}
                            userNumber={userNumber}
                        />
                        : <></>}
                </SafeAreaView>
            </ImageBackground>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    }
});
