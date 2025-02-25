import {Alert, FlatList, StyleProp, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import Title from "../components/Title";
import React, {useEffect, useState} from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/PrimaryButton";
import Card from "../components/Card";
import Instruction from "../components/Instruction";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../constants/Colors";


function generateRandomBetween(min: number, max: number, exclude: number) {
    const rndNum = Math.floor(Math.random() * (max - min + 1)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum
    }
}

type GameScreenProps = {
    userNumber: number;
    onGameOver: (rounds: number) => void;
}

type PortraitProps = {
    styles: StyleProp<any>,
    currentGuess: number,
    handleLower: () => void,
    handleUpper: () => void,
}

type LandScapeProps = {
    styles: StyleProp<any>,
    currentGuess: number,
    handleLower: () => void,
    handleUpper: () => void,
}

function GameScreen({userNumber, onGameOver}: GameScreenProps) {
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(100)
    const [rounds, setRounds] = useState(0);
    const [roundList, setRoundList] = useState<Array<number>>([]);
    const {width, height} = useWindowDimensions();

    useEffect(() => {
        if (currentGuess === userNumber) {
            console.info(`Guess Over: ${currentGuess}`);
            onGameOver(rounds);
        }
    }, [currentGuess, userNumber, onGameOver]);

    function handleLower() {
        if (currentGuess < userNumber) {
            Alert.alert("Liar", "Your number is not lower")
            return;
        }
        setMaxValue(() => currentGuess)
        const guessNumber = generateRandomBetween(minValue, currentGuess, currentGuess);
        setCurrentGuess(() => guessNumber);
        setRounds(() => rounds + 1)
        setRoundList((roundValue) => [currentGuess, ...roundValue]);
    }

    function handleUpper() {
        if (currentGuess > userNumber) {
            Alert.alert("Liar", "Your number is not higher")
            return;
        }
        setMinValue(() => currentGuess);
        const guessNumber = generateRandomBetween(currentGuess, maxValue, currentGuess);
        setCurrentGuess(() => guessNumber);
        setRounds(() => rounds + 1)
        setRoundList((roundValue) => [currentGuess, ...roundValue]);
    }

    console.log(`Current width is ${width}`)

    return (
        <>
            {width > 400 ?
                <LandscapeLayout
                    styles={styles}
                    currentGuess={currentGuess}
                    handleLower={handleLower}
                    handleUpper={handleUpper}/>
                :
                <PortraitLayout
                    styles={styles}
                    currentGuess={currentGuess}
                    handleLower={handleLower}
                    handleUpper={handleUpper}
                />
            }
            <FlatList style={{flex: 2}} data={roundList} renderItem={
                itemData =>
                    (<Text
                        style={styles.roundText}>{`#${roundList.length - itemData.index}: ${itemData.item}`}</Text>)
            }/>
        </>
    )
}


const PortraitLayout: React.FC<PortraitProps> =
    ({styles, currentGuess, handleLower, handleUpper}) => (
        <>
            <View style={styles.screen}>
                <View style={{marginTop: 20}}>
                    <Title>Opponent´s Guess.</Title>
                </View>
                <NumberContainer>
                    {currentGuess}
                </NumberContainer>
                <Card>
                    <Instruction>
                        Higher or Lower?
                    </Instruction>
                    <View style={styles.buttonContainer}>
                        <View style={{flex: 1}}>
                            <PrimaryButton onPress={handleLower}>
                                <Ionicons name="remove-outline"/>
                            </PrimaryButton>
                        </View>
                        <View style={{flex: 1}}>
                            <PrimaryButton onPress={handleUpper}>
                                <Ionicons name="add-outline"/>
                            </PrimaryButton>
                        </View>
                    </View>
                </Card>
            </View>
        </>
    )

const LandscapeLayout: React.FC<PortraitProps> =
    ({styles, currentGuess, handleLower, handleUpper}: LandScapeProps) => (
        <>
            <View style={{flex: 1}}>
                <Title style={{marginTop: 36, marginHorizontal: 48, fontSize: 16}}>Opponent Guess</Title>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginHorizontal: 16
                }}>
                    <View style={{flex: 1}}>
                        <PrimaryButton onPress={handleLower}>
                            <Ionicons name="remove-outline"/>
                        </PrimaryButton>
                    </View>
                    <NumberContainer>
                        {currentGuess}
                    </NumberContainer>
                    <View style={{flex: 1}}>
                        <PrimaryButton onPress={handleUpper}>
                            <Ionicons name="add-outline"/>
                        </PrimaryButton>
                    </View>
                </View>
            </View>
        </>
    )

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 36
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 20
    },
    roundText: {
        flex: 1,
        padding: 16,
        color: Colors.primary600,
        backgroundColor: Colors.accent500,
        borderRadius: 40,
        borderColor: Colors.primary800,
        borderWidth: 2,
        marginVertical: 12
    }
})

export default GameScreen;