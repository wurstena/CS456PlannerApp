import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Button, Dimensions, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { ColorPicker } from 'react-native-status-color-picker';
import { saveCategory } from '../storage/saveInput';

export default function AddCategoryScreen({ route, navigation }) {
    let previous = route.params.previous
    navigation.setOptions({
        headerLeft: () => (
            <Ionicons.Button
                onPress={() => navigation.navigate(previous, { update: false })}
                color="#707070"
                backgroundColor="#f8f8f8"
                name="close"
                size="30"
            />
        ),
        headerRight: () => (
            <Button
                title="Save"
                onPress={() => { handleSave() }}
            />
        )
    });

    function createAlert(message) {
        Alert.alert(
            "Error",
            message,
            [
                { text: "OK", onPress: () => console.log("OK Pressed"), style: "cancel" }
            ]
        );
    }

    function handleSave() {
        if (title == null || title === "") {
            return createAlert("You must add a title before saving")
        } else {
            let categoryItem = {
                title: title,
                color: color,
                color_icon: true,
                notes: notes
            }
            saveCategory(categoryItem)
            setTitle(null)
            setNotes(null)
            navigation.navigate(previous, { update: true })
        }
    }

    const [colors, setColorList] = useState(["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B"], '#F44336')
    const [title, setTitle] = useState(null);
    const [notes, setNotes] = useState(null);
    const [color, setColor] = useState(null);


    var onSelect = (new_color) => setColor(new_color);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={100}
                enabled
            >
                <ScrollView>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader}>Title</Text>
                        <TextInput style={styles.textInput} value={title} onChangeText={text => setTitle(text)} />
                        <Text style={styles.inputHeader}>Color</Text>
                        <ColorPicker
                            colors={colors}
                            selectedColor={color}
                            onSelect={onSelect}
                        />
                        <Text style={styles.inputHeader}>Notes</Text>
                        <TextInput
                            style={styles.textInput}
                            multiline={true}
                            maxLength={20}
                            onBlur={Keyboard.dismiss}
                            value={notes}
                            onChangeText={(text) => setNotes(text)}
                        />
                    </View>
                </ScrollView >
            </KeyboardAvoidingView>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    categoryWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    items: {
        marginTop: 30,
    },
    writeCategoryWrapper: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250,
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addText: {},
    inputContainer: {
        paddingTop: 15,
        marginLeft: 20,
        marginRight: 20
    },
    textInput: {
        fontSize: 18,
        backgroundColor: "white",
        borderColor: '#d3d3d3',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        height: 45,
        paddingLeft: 6,
        paddingRight: 20,
        marginBottom: 12,
        flex: 1
    },
    inputHeader: {
        fontSize: 18,
        paddingBottom: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    dropdown: {
        backgroundColor: "white",
        borderColor: '#d3d3d3',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        height: 45,
        fontSize: 18,
        flex: 1,
        marginBottom: 12
    },
    dropdown_text: {
        marginVertical: 10,
        marginHorizontal: 6,
        fontSize: 18,
        color: '#707070'
    },
    dropdown_dropdown: {
        borderColor: '#d3d3d3',
        borderWidth: 1,
        width: Dimensions.get('screen').width - 40,
        paddingRight: 20,
    },
    dropdown_rows: {
        fontSize: 18,
        margin: 8,
        color: "#4b4b4b",
        height: 25
    }
});
