import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { PieChart } from 'react-native-svg-charts';
import Task from '../components/Task';
import { getCategories, getGraphData, getPriorityData, getTasksData, shufflePriorityData } from '../storage/saveInput';


export default function DashboardScreen({ route, navigation }) {
    navigation.setOptions({
        headerRight: () => (
            <Ionicons.Button
                onPress={() => navigation.navigate("Add a Task", { previous: "Dashboard" })}
                color="#707070"
                backgroundColor="#f8f8f8"
                name="add"
                size="30"
            />
        ),
    });

    // const [listOfTasks, setListOfTasks] = useState([])
    // const [listOfCompletedTasks, setListOfCompletedTasks] = useState([])

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
        }
    }, [navigation, route, isFocused]);

    const [value, setValue] = useState(false)

    const confettiRef = useRef("confetti")


    function showTask(index) {
        navigation.navigate("View Task", { previous: "Dashboard", index: { index } })
    }

    function showTasks() {
        let priorityTaskList = getPriorityData()
        let totalTaskList = getTasksData()
        let categoryList = getCategories()
        return (
            <View>
                {
                    priorityTaskList.length > 0 ? priorityTaskList.map((object, index) => {
                        let category_title = object.category
                        let category = categoryList.find(item => item.title == category_title)
                        let color = (category) ? category.color : "#b8b8b8"
                        return (
                            <TouchableOpacity onPress={() => showTask(index)}>
                                <Task task={object}
                                    text={object.title}
                                    key={index}
                                    color={color}
                                    index={index}
                                    value={value}
                                    confettiRef={confettiRef}
                                    setValue={setValue}
                                    previous={"Dashboard"} />
                            </TouchableOpacity>
                        )
                    }) : (priorityTaskList.length > 0 && totalTaskList.length > 0)
                        ? <Text>Press "Shuffle Tasks" to see more</Text>
                        : null
                }
            </View>
        );
    }

    function showPieChart() {
        data_stuff = getGraphData();
        const pieData = (data_stuff && data_stuff.length > 0) ? data_stuff
            .map((value, index) => ({
                value,
                svg: {
                    fill: (index == 0 ? "#5CAEC9" : index == 1 ? "#47A294" : "blue"),
                    onPress: () => console.log('press', index),
                },
                key: `pie-${index}`,
            })) : []
        return (
            <View>
                {(data_stuff[0] != 0 || data_stuff[1] != 0) ?
                    <View>
                        <PieChart style={styles.PieChart} data={pieData} />
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", width: "100%" }}>
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <View style={styles.completedCircle}></View>
                                <Text>Completed</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <View style={styles.todoCircle}></View>
                                <Text>To Do</Text>
                            </View>
                        </View>
                    </View>
                    : <Text style={styles.placeHolderText}>Press the + button to add your first task</Text>}
                {/* <PieChart style={styles.PieChart} data={pieData} /> */}


            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Added this scroll view to enable scrolling when list gets longer than the page */}

            <View>
                <View style={styles.tasksWrapper}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={styles.sectionTitle}>Top 3 Upcoming Tasks</Text>
                        <TouchableOpacity style={styles.shuffleButton} onPress={() => {
                            shufflePriorityData()
                            setValue(!value)
                        }}>
                            <Text style={styles.shuffleButtonText}>Shuffle Tasks</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.items}>
                        {
                            showTasks()
                        }
                    </View>
                </View>
            </View>

            <View style={styles.monthDetailWrapper}>
                <Text style={styles.sectionTitle}>This Month's Progress</Text>
                {showPieChart()}

            </View>

            <ConfettiCannon
                count={200}
                origin={{ x: Dimensions.get("screen").width / 2, y: -20 }}
                autoStart={false}
                explosionSpeed={1200}
                fadeOut={true}
                ref={confettiRef}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    shuffleButtonText: {
        textAlign: "center",
        fontSize: 12
    },
    shuffleButton: {
        width: 60,
        backgroundColor: "#ffffff",
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        borderRadius: 12,
        padding: 5
    },
    todoCircle: {
        width: 18,
        height: 18,
        backgroundColor: "#5CAEC9",
        // borderColor: "#F8F8F8",
        // borderWidth: 2,
        borderRadius: 30,
        marginHorizontal: 8,
    },
    completedCircle: {
        width: 18,
        height: 18,
        backgroundColor: "#47A294",
        // borderColor: "#F8F8F8",
        // borderWidth: 2,
        borderRadius: 30,
        marginHorizontal: 8
    },
    placeHolderText: {
        // marginBottom: 50,
        marginTop: 30,
        fontSize: 18,
        width: 220,
        // borderColor:"#5CAEC9",
        // borderWidth:2,
        backgroundColor: "#94C9DB",
        borderRadius: 25,
        textAlign: "center",
        justifyContent: "center",
        alignSelf: "center",
        padding: 20,
        overflow: "hidden",
    },
    PieChart: {
        height: 200,
        marginBottom: 15,
        marginTop: 20
    },
    graphContainer: {
        // alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    tasksWrapper: {
        paddingTop: 20,
        paddingHorizontal: 20,
        minHeight: 292
    },
    monthDetailWrapper: {
        // paddingTop: 20,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    sectionTitle: {
        fontSize: 24,
        color: "#4b4b4b",
    },
    items: {
        marginTop: 20,
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
});
