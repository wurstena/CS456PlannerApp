import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Category from '../components/Category';
import Reward from '../components/Reward';
import { Ionicons } from '@expo/vector-icons';
import { completeTask, category_list, getCategories, getRewards } from '../storage/saveInput';
import { useIsFocused } from "@react-navigation/native";

export default function RewardManagerScreen({ navigation, route }) {
  const [value, setValue] = useState(0);
  let listOfRewards = getRewards();

  function showReward(index) {
    navigation.navigate("View Reward", { previous: "Reward Manager", index: { index } })
  }

  function showRewards() {
    return (
      <View>
        {
          listOfRewards.length > 0 ?
            listOfRewards.map((object, index) => {
              return (
                <TouchableOpacity onPress={() => showReward(index)}>
                  <Reward key={object.title} title={object.title} index={index} value={value} setValue={setValue} />
                </TouchableOpacity>
              )
            })
            : 
            <Text style={styles.placeHolderText}>Press the + button to add your first reward</Text>
        }
      </View>
    );
  }


  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.addButtonWrapper}>
          <Ionicons.Button
            onPress={() => navigation.navigate("Add a Reward", { previous: "Reward Manager" })}
            color="#707070"
            backgroundColor="#f8f8f8"
            name="add"
            size="40"
            style={styles.addButton}
          />
        </View>
        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          <View style={styles.items}>
            {
              showRewards()
            }
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
  addButtonWrapper: {
    alignSelf: "flex-end",
    margin: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  addButton: {
    // padding: 5
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  tasksWrapper: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
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
