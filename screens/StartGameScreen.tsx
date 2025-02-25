import {Alert, KeyboardAvoidingView, ScrollView, StyleSheet, TextInput, useWindowDimensions, View} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import React, {useMemo, useState} from "react";
import Colors from "../constants/Colors";
import Card from "../components/Card";
import Instruction from "../components/Instruction";
import Title from "../components/Title";

type StartGameScreenProps = {
    onPickNumber: (pickedNumber: number) => void;
}

function StartGameScreen({onPickNumber}: StartGameScreenProps) {
    const [enteredNumber, setEnteredNumber] = useState('');
    const {width, height} = useWindowDimensions();
    const dynamicStyles = useMemo(() => {
        return getStyles(height, width);
    }, [height, width]);

    function numberInputHandler(enteredText: string) {
        setEnteredNumber(enteredText);
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            //todo: show alert
            Alert.alert(
                "Invalid number",
                "Number has to be between 1 and 99",
                [{text: "Okay", style: "destructive", onPress: resetEnteredNumber}]);
            return;
        }

        onPickNumber(chosenNumber);
    }

    function resetEnteredNumber() {
        setEnteredNumber("");
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" style={{flex: 1}}>
                <View style={dynamicStyles.container}>
                    <Title style={{marginBottom: 24, marginHorizontal: 18}}>Guess my number</Title>
                    <Card>
                        <Instruction style={{fontSize: 18, color: Colors.accent500}}>Type a number</Instruction>
                        <TextInput
                            style={dynamicStyles.numberInput}
                            maxLength={2}
                            keyboardType="number-pad"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={enteredNumber}
                            onChangeText={numberInputHandler}
                        />
                        <View style={dynamicStyles.buttonsContainer}>
                            <View style={{flex: 1}}>
                                <PrimaryButton onPress={resetEnteredNumber}>Reset</PrimaryButton>
                            </View>
                            <View style={{flex: 1}}>
                                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                            </View>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const getStyles = (height: number, width: number) =>
    StyleSheet.create({
        container: {
            marginTop: height >= 400 ? 100 : 36,
        },
        numberInput: {
            height: 60,
            width: 50,
            fontSize: 32,
            borderColor: Colors.accent500,
            borderBottomWidth: 2,
            color: Colors.accent500,
            marginVertical: 8,
            fontWeight: "bold",
            textAlign: "center",
        },
        buttonsContainer: {
            flexDirection: "row",
        }
    });

export default StartGameScreen;