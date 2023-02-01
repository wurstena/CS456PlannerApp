import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { deleteTask, getPriorityData, getTasksData } from '../storage/saveInput';


export default function ViewTaskScreen({ route, navigation }) {
    const previous = route.params.previous
    const index = route.params.index.index
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
        // headerRight: () => (
        //     <Button
        //         title="Save"
        //         onPress={() => { handleSave() }}
        //     />
        // )
    });

    function deleteTaskHandler(index) {
        deleteTask(index)
        navigation.navigate(previous, { update: false })
    }

    const [value, setValue] = useState(0); // integer state
    // const [listOfCategories, setListOfCategories] = useState([])


    let listOfTasks = previous === "Dashboard" ? getPriorityData() : getTasksData();

    // const isFocused = useIsFocused();
    // useEffect(() => {
    //     if (isFocused) {
    //         // setListOfCategories(category_list)
    //     }
    // }, [navigation, route, isFocused]);

    /*
    title: title,
                category: category_label,
                reward: reward,
                date: date,
                time: time,
                priority: priority,
                notes: notes
    */
    return (
        <View style={styles(null).container}>
            <ScrollView>
                <View style={styles(null).inputContainer}>
                    <Text style={styles(null).sectionHeader}>Title</Text>
                    <Text style={styles(null).sectionContent}>{listOfTasks[index].title}</Text>
                    <Text style={styles(null).sectionHeader}>Category</Text>
                    <Text style={styles(null).sectionContent}>{listOfTasks[index].category}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{
                            flexDirection: 'column',
                            width: (Dimensions.get('screen').width / 2 - 25),
                            marginRight: 5
                        }}>
                            <Text style={styles(null).sectionHeader}>Due Date</Text>
                            <Text style={styles(null).sectionContent}>{(moment(listOfTasks[index].date).format("MM/DD/YY") !== "Invalid date") ? moment(listOfTasks[index].date).format("MM/DD/YY") : null}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'column',
                            width: (Dimensions.get('screen').width / 2 - 25),
                            marginRight: 5
                        }}>
                            <Text style={styles(null).sectionHeader}>Due Time</Text>
                            <Text style={styles(null).sectionContent}>{(moment(listOfTasks[index].time).format('LT') !== "Invalid date") ? moment(listOfTasks[index].time).format('LT') : null}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
                        <Text style={styles(null).sectionHeader}>Priority</Text>
                        <View style={{
                            borderWidth: 1,
                            borderRadius: 50,
                            paddingLeft: 10,
                            paddingRight: 10,
                            marginLeft: 15,
                            borderColor: (listOfTasks[index].priority === "Medium") ? "#F2B100"
                                : (listOfTasks[index].priority === "Low") ? "#14DC3D"
                                    : (listOfTasks[index].priority === "High") ? "#FF2D1E"
                                        : "#F2B100"
                        }}>
                            <Text style={{
                                fontSize: 16,
                                paddingTop: 5,
                                paddingBottom: 5,
                                alignSelf: "center",
                                justifyContent: "center",
                                color: (listOfTasks[index].priority === "Medium") ? "#F2B100"
                                    : (listOfTasks[index].priority === "Low") ? "#14DC3D"
                                        : (listOfTasks[index].priority === "High") ? "#FF2D1E"
                                            : "#F2B100",
                            }}>{listOfTasks[index].priority}</Text>
                        </View>
                    </View>
                    <Text style={styles(null).sectionHeader}>Reward</Text>
                    <Text style={styles(null).sectionContent}>{listOfTasks[index].reward}</Text>
                    <Text style={styles(null).sectionHeader}>Notes</Text>
                    <Text style={styles(null).sectionContent}>{listOfTasks[index].notes}</Text>
                </View>
                <TouchableOpacity style={styles(null).trashCan} onPress={(index) => deleteTaskHandler(index)}>
                    <Ionicons name="trash" color="red" size="30" />
                    <Text style={{ padding: 10, fontSize: 16 }}>Delete Task</Text>
                </TouchableOpacity>
            </ScrollView >
        </View >
    );
}

const styles = (color) => StyleSheet.create({
    trashCan: {
        width: "100%",
        backgroundColor: "#ffffff",
        paddingVertical: 5,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    prioritySectionContent: {
        fontSize: 18,
        paddingTop: 5,
        paddingBottom: 5,
        fontWeight: "bold",
        alignSelf: "center",
        justifyContent: "center"
    },
    priorityWrapper: {
        borderWidth: 1,
        borderColor: "thistle",
        borderRadius: 50,
        width: 100,
        marginBottom: 15
    },
    circular: {
        width: 50,
        height: 50,
        backgroundColor: color,
        // borderColor: "#F8F8F8",
        // borderWidth: 2,
        borderRadius: 30,
        marginBottom: 15
    },
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
    sectionHeader: {
        fontSize: 18,
        paddingBottom: 5
    },
    sectionContent: {
        fontSize: 18,
        paddingBottom: 15,
        fontWeight: "bold"
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
