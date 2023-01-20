import React, { Component, useState, useEffect, useRef } from 'react';
import { Alert, Pressable, Modal, Keyboard, TextInput, ScrollView, Button, View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import ModalDropdown, { select } from 'react-native-modal-dropdown';
import { Dimensions, TouchableWithoutFeedback } from 'react-native';
import { ColorPicker } from 'react-native-status-color-picker';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import saveTasks, { rewards_list, category_list, saveCategory, saveReward, getCategories, getRewards } from '../storage/saveInput'
import { useIsFocused } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';

let deviceWidth = Dimensions.get('window').width

var radio_props = [
    { label: 'Low', value: 0, color: "green" },
    { label: 'Medium', value: 1, color: "orange" },
    { label: 'High', value: 2, color: "red" }
];

const ADD_CATEGORY_OPTION = [
    { title: '+ Add a New Category', color_icon: false }];

const ADD_REWARD_OPTION = [
    { title: '+ Add a New Reward', color_icon: false }
]

export default function AddTaskScreen({ route, navigation }) {
    let previous = route.params.previous
    navigation.setOptions({
        headerLeft: () => (
            <Ionicons.Button
                // onPress={() => navigation.navigate(previous, { update: false })}
                onPress={() => clearVariablesAndNavigate(previous)}
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

    function clearVariablesAndNavigate(previous) {
        setTitle(null)
        setCategoryLabel(null)
        setReward(null)
        setShowDate(false)
        setShowTime(false)
        setDate(new Date())
        setTime(new Date())
        setNotes(null)
        setRadioButtonVal(1)
        rewardDropdownRef.current.select(-1)
        categoryDropdownRef.current.select(-1)
        navigation.navigate(previous, { update: false })
    }

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
        let priority = "Medium"
        if (radio_button_val == 0) {
            priority = "Low"
        } else if (radio_button_val == 2) {
            priority = "High"
        }
        if (title == null || title === "") {
            return createAlert("You must add a title before saving")
        } else {
            let taskItem = {
                title: title,
                category: category_label,
                reward: reward,
                date: showDate ? date : null,
                time: showTime ? time : null,
                priority: priority,
                notes: notes
            }
            saveTasks(taskItem)
            setTitle(null)
            setCategoryLabel(null)
            setReward(null)
            setShowDate(false)
            setShowTime(false)
            setDate(new Date())
            setTime(new Date())
            setNotes(null)
            setRadioButtonVal(1)
            rewardDropdownRef.current.select(-1)
            categoryDropdownRef.current.select(-1)
            navigation.navigate(previous, { update: true })
        }
    }

    function dropdown_category_onSelect(idx, value) {
        if (value.title === "+ Add a New Category") {
            setCategoryModalVisible(!categoryModalVisible)
        }
        else {
            setCategoryLabel(value.title)
        }
    };

    function dropdown_reward_onSelect(idx, value) {
        if (value.title === "+ Add a New Reward") {
            setRewardModalVisible(!rewardModalVisible)
        }
        else {
            setReward(value.title)
        }
    };

    function dropdown_renderButtonText(rowData) {
        return dropdown_renderDropDownRow(rowData)
    }

    function dropdown_renderDropDownRow(rowData) {
        return (
            <View style={{ flexDirection: "row" }}>
                {
                    rowData.color_icon &&
                    <Ionicons name="square" style={{ color: rowData.color, marginTop: 4, marginLeft: 6 }} size="30" />
                }
                <Text style={styles.dropdown_rows}>
                    {`${rowData.title}`}
                </Text>
            </View>
        );
    }

    const rewardDropdownRef = useRef("rewardDropdown")
    const categoryDropdownRef = useRef("categoryDropdown")
    const [value, setValue] = useState(0); // integer state
    const [listOfCategories, setListOfCategories] = useState(getCategories().concat(ADD_CATEGORY_OPTION))
    const [listOfRewards, setListOfRewards] = useState(getRewards().concat(ADD_REWARD_OPTION))
    // const [listOfRewards, setListOfRewards] = useState([])
    // let listOfCategories = getCategories().concat(ADD_CATEGORY_OPTION);
    // let listOfRewards = getRewards();
    // const isFocused = useIsFocused();
    // useEffect(() => {
    //     if (isFocused) {
    //         setListOfCategories(category_list.concat(ADD_CATEGORY_OPTION))
    //         setListOfRewards(rewards_list.concat(ADD_REWARD_OPTION))
    //     }
    // }, [navigation, route, category_list, isFocused]);

    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [rewardModalVisible, setRewardModalVisible] = useState(false);
    const [colors, selectedColor] = useState(["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B"], '#F44336')
    const [radio_button_val, setRadioButtonVal] = useState(1)
    // var [title, category_label, date, time, priority, reward, notes] = useState("", "", "", "", "", "", "")
    const [title, setTitle] = useState(null)
    const [category_label, setCategoryLabel] = useState(null);
    const [reward, setReward] = useState(null);
    const [notes, setNotes] = useState(null);
    const [newCategoryTitle, setNewCategoryTitle] = useState(null)
    const [newRewardTitle, setNewRewardTitle] = useState(null)

    var onSelect = color => selectedColor(color);

    const [addedNewCategory, setAddedNewCategory] = useState(false)
    const [addedNewReward, setAddedNewReward] = useState(false)
    // var addedNewCategory = false;
    // var addedNewReward = false;

    const [time, setTime] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        // setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const onChangeTime = (event, selectedDate) => {
        const currentDate = selectedDate || time;
        // setShow(Platform.OS === 'ios');
        setTime(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
    };

    const showDatepicker = () => {
        setShowDate(!showDate);
        setDate(new Date())
    };

    const showTimepicker = () => {
        setShowTime(!showTime);
        setTime(new Date())
    }

    function saveCategoryModal() {
        setCategoryModalVisible(!categoryModalVisible)
        let categoryItem = {
            title: newCategoryTitle,
            color: colors,
            color_icon: true
        }
        saveCategory(categoryItem)
        setNewCategoryTitle(null)
        selectedColor(["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B"], '#F44336')
        let list = getCategories().concat(ADD_CATEGORY_OPTION)
        setListOfCategories(list)
        setAddedNewCategory(true);
    }

    function saveRewardModal() {
        setRewardModalVisible(!rewardModalVisible)
        let rewardItem = {
            title: newRewardTitle
        }
        saveReward(rewardItem)
        setNewRewardTitle(null)
        let list = getRewards().concat(ADD_REWARD_OPTION)
        setListOfRewards(list)
        setAddedNewReward(true);
    }

    useEffect(() => {
        if (addedNewCategory) {
            categoryDropdownRef.current.select(listOfCategories.length - 2)
            let cat = listOfCategories[listOfCategories.length - 2]
            setCategoryLabel(cat.title)
            setAddedNewCategory(false)
        }
    }, [listOfCategories])

    useEffect(() => {
        if (addedNewReward) {
            rewardDropdownRef.current.select(listOfRewards.length - 2)
            let rew = listOfRewards[listOfRewards.length - 2]
            setReward(rew.title)
            setAddedNewReward(false)
        }
    }, [listOfRewards])

    return (
        <View style={styles.container}>
            <Modal
                // animationType="fade"
                transparent={true}
                visible={categoryModalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setCategoryModalVisible(!categoryModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalInputHeader}>New Category Title</Text>
                        <TextInput style={styles.modalTextInput} value={newCategoryTitle} onChangeText={text => setNewCategoryTitle(text)} />
                        <Text style={styles.modalInputHeader}>Color</Text>
                        {<ColorPicker
                            colors={colors}
                            selectedColor={selectedColor}
                            onSelect={onSelect}
                        />}
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            // onPress={() => setCategoryModalVisible(!categoryModalVisible)}
                            onPress={() => {
                                saveCategoryModal()
                            }}
                        >
                            <Text style={styles.textStyle}>Save Category</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={rewardModalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setRewardModalVisible(!rewardModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.inputHeader}>New Reward</Text>
                        <TextInput style={styles.modalTextInput} value={newRewardTitle} onChangeText={text => setNewRewardTitle(text)} />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                saveRewardModal()
                            }}
                        >
                            <Text style={styles.textStyle}>Save Reward</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={100}
                enabled
            >
                <ScrollView>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader}>Title</Text>
                        <TextInput style={styles.textInput} placeholder={'Write a task'} value={title} onChangeText={text => setTitle(text)} />
                        <Text style={styles.inputHeader}>Category</Text>
                        <ModalDropdown style={styles.dropdown}
                            ref={categoryDropdownRef}
                            options={getCategories().concat(ADD_CATEGORY_OPTION)}
                            defaultValue="Please Select"
                            textStyle={styles.dropdown_text}
                            dropdownStyle={styles.dropdown_dropdown}
                            onSelect={(idx, value) => dropdown_category_onSelect(idx, value)}
                            renderRow={dropdown_renderDropDownRow.bind(this)}
                            renderButtonText={(rowData) => dropdown_renderButtonText(rowData)}>
                        </ModalDropdown>
                        <View style={{ flexDirection: "row", marginBottom: 10, justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "column", width: (Dimensions.get('screen').width / 2 - 25), }}>
                                <Text style={styles.inputHeader}>Date</Text>
                                <TouchableOpacity onPress={showDatepicker}>
                                    <View style={styles.dateTimePickerButton}>
                                        <Text style={{ fontSize: 14, color: "#007aff", margin: 8 }}>{!showDate ? "Choose a Due Date" : "Remove Date"}</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ marginTop: 12 }}>
                                    {showDate && (<DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={"date"}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChangeDate}
                                    />)}
                                </View>
                            </View>
                            <View style={{ flexDirection: "column", width: (Dimensions.get('screen').width / 2 - 25), }}>
                                <Text style={styles.inputHeader}>Time</Text>
                                <TouchableOpacity onPress={showTimepicker}>
                                    <View style={styles.dateTimePickerButton}>
                                        <Text style={{ fontSize: 14, color: "#007aff", margin: 8 }}>{!showTime ? "Choose a Due Time" : "Remove Time"}</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ marginTop: 12 }}>
                                    {showTime && (<DateTimePicker
                                        testID="dateTimePicker"
                                        value={time}
                                        mode={"time"}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChangeTime}
                                    />)}
                                </View>
                            </View>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ fontSize: 18, paddingBottom: 10, paddingTop: 5 }}>Priority</Text>
                            <RadioForm
                                radio_props={radio_props}
                                initial={1}
                                formHorizontal={true}
                                onPress={(value) => {
                                    setRadioButtonVal(value)
                                }}
                                radioStyle={{ paddingRight: 50 }}
                            />
                        </View>
                        <Text style={styles.inputHeader}>Reward</Text>
                        <ModalDropdown style={styles.dropdown}
                            ref={rewardDropdownRef}
                            options={listOfRewards}
                            textStyle={styles.dropdown_text}
                            dropdownStyle={styles.dropdown_dropdown}
                            onSelect={(idx, value) => dropdown_reward_onSelect(idx, value)}
                            renderRow={dropdown_renderDropDownRow.bind(this)}
                            renderButtonText={(rowData) => dropdown_renderButtonText(rowData)}>
                        </ModalDropdown>
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
    dateTimePickerButton: {
        alignSelf: 'baseline',
        backgroundColor: "#ffffff",
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        width: (Dimensions.get('screen').width / 2 - 35),
        alignItems: "center"
    },
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    tasksWrapper: {
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
    writeTaskWrapper: {
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
    modalInputHeader: {
        fontSize: 18,
        paddingBottom: 10,
        alignSelf: "flex-start"
    },
    modalTextInput: {
        fontSize: 18,
        backgroundColor: "white",
        borderColor: '#d3d3d3',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        width: deviceWidth - 120,
        height: 45,
        marginBottom: 20
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
