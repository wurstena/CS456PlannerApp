import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import Task from '../components/Task';
import { getCategories, getTasksData, getThisMonthTasks, getThisWeekTasks, getTodayTasks } from '../storage/saveInput';


export default function TasksScreen({ route, navigation }) {
  const [value, setValue] = useState(false); // integer state

  navigation.setOptions({
    headerRight: () => (
      <Ionicons.Button
        onPress={() => navigation.navigate("Add a Task", { previous: "Tasks" })}
        color="#707070"
        backgroundColor="#f8f8f8"
        name="add"
        size="30"
      />
    ),
  });

  function showTask(index) {
    navigation.navigate("View Task", { previous: "Tasks", index: { index } })
  }

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
    }
  }, [navigation, route, isFocused]);

  const confettiRef = useRef("confetti")

  const [tabSelected, setTabSelected] = useState("Today")

  function showTasks() {
    let listOfTasks = [];
    if (tabSelected === "Today") {
      listOfTasks = getTodayTasks();
    } else if (tabSelected === "This Week") {
      listOfTasks = getThisWeekTasks();
    } else if (tabSelected === "This Month") {
      listOfTasks = getThisMonthTasks();
    } else {
      listOfTasks = getTasksData()
    }
    let categoryList = getCategories()
    return (
      <View>
        {
          listOfTasks.length > 0 ? listOfTasks.map((object, index) => {
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
                  confettiRef={confettiRef}
                  value={value}
                  setValue={setValue}
                  previous={"Tasks"} />
              </TouchableOpacity>
            )
          })
            : <Text style={styles.placeHolderText}>Press the + button to add your first task</Text>
        }
      </View>
    );
  }


  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity onPress={() => setTabSelected("Today")}>
          <Text style={{
            backgroundColor: tabSelected === "Today" ? "#5CAEC9" : "#94C9DB",
            fontSize: 18,
            padding: 8,
            color: "white"
          }}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTabSelected("This Week")}>
          <Text style={{
            backgroundColor: tabSelected === "This Week" ? "#5CAEC9" : "#94C9DB",
            fontSize: 18,
            padding: 8,
            color: "white"
          }}>This Week</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTabSelected("This Month")}>
          <Text style={{
            backgroundColor: tabSelected === "This Month" ? "#5CAEC9" : "#94C9DB",
            fontSize: 18,
            padding: 8,
            color: "white"
          }}>This Month</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTabSelected("All Tasks")}>
          <Text style={{
            backgroundColor: tabSelected === "All Tasks" ? "#5CAEC9" : "#94C9DB",
            fontSize: 18,
            padding: 8,
            color: "white"
          }}>All Tasks</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          {/* <Text style={styles.sectionTitle}>Today's tasks</Text> */}
          <View style={styles.items}>
            {
              showTasks()
            }
          </View>
        </View>

      </ScrollView>
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
  tab: {
    backgroundColor: "#94C9DB",
    fontSize: 18,
    padding: 8,
    color: "white"
  },
  placeHolderText: {
    // marginBottom: 50,
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
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    // marginTop: 30,
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
