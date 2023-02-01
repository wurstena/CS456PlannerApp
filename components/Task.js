import moment from 'moment';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { completePriorityTask, completeTask } from '../storage/saveInput';

const Task = (props) => {
  function completeTaskAtIndex(index, value) {
    props.setValue(!value)
    props.confettiRef.current.start()
    if (props.previous === "Dashboard") {
      completePriorityTask(index)
    } else {
      completeTask(index)
    }
    createAlert(props.task.reward ? `Your reward is: ${props.task.reward}!` : "")
  }

  function createAlert(message) {
    Alert.alert(
      "Congratulations!",
      message,
      [
        { text: "OK", onPress: () => console.log("OK Pressed"), style: "cancel" }
      ]
    );
  }

  return (
    <View style={styles(props).item}>
      <View style={styles(props).itemLeft}>
        <View style={styles(props).square}></View>
        <TouchableOpacity onPress={() => completeTaskAtIndex(props.index, props.value)}>
          <View style={styles(props).circular}></View>
        </TouchableOpacity>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles(props).itemText}>{props.task.title}</Text>
          <Text style={styles(props).itemCategory}>{props.task.category}</Text>
        </View>
      </View>
      <View style={styles(props).itemRight}>
        <View style={{
          borderWidth: 1,
          borderRadius: 50,
          paddingLeft: 8,
          paddingRight: 8,
          // justifyContent:,
          marginRight: 15,
          borderColor: (props.task.priority === "Medium") ? "#F2B100"
            : (props.task.priority === "Low") ? "#14DC3D"
              : (props.task.priority === "High") ? "#FF2D1E"
                : "#F2B100"
        }}>
          <Text style={{
            fontSize: 11,
            paddingTop: 2,
            paddingBottom: 2,
            alignSelf: "center",
            justifyContent: "center",
            color: (props.task.priority === "Medium") ? "#F2B100"
              : (props.task.priority === "Low") ? "#14DC3D"
                : (props.task.priority === "High") ? "#FF2D1E"
                  : "#F2B100",
          }}>{props.task.priority}</Text>
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles(props).itemDate}>{(moment(props.task.date).format("MM/DD/YY") !== "Invalid date") ? moment(props.task.date).format("MM/DD/YY") : null}</Text>
          <Text style={styles(props).itemTime}>{(moment(props.task.time).format('LT') !== "Invalid date") ? moment(props.task.time).format('LT') : null}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = (props) => StyleSheet.create({
  item: {
    // backgroundColor: '#FFF',
    // padding: 15,
    // borderRadius: 10,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // marginBottom: 20,
    height: 51,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  itemRight: {
    justifyContent: "flex-start",
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  square: {
    width: 19,
    height: 51,
    backgroundColor: props.color ? props.color : "#8b8b8b",
    marginRight: 10,
  },
  itemText: {
    fontSize: 18,
    paddingBottom: 2
  },
  itemCategory: {
    fontSize: 14,
  },
  itemDate: {
    fontSize: 14,
    alignSelf: "flex-end",
    paddingRight: 10,
    paddingBottom: 2
  },
  itemTime: {
    fontSize: 14,
    alignSelf: "flex-end",
    paddingRight: 10,
  },
  circular: {
    width: 27,
    height: 27,
    borderColor: '#8b8b8b',
    borderWidth: 1,
    borderRadius: 24,
    marginRight: 15,
  },
});

export default Task;