import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Category from '../components/Category';
import { getCategories } from '../storage/saveInput';

export default function CategoryManagerScreen({ navigation, route }) {
  const [value, setValue] = useState(0); // integer state
  // const [listOfCategories, setListOfCategories] = useState([])
  let listOfCategories = getCategories();
  // const isFocused = useIsFocused();
  // useEffect(() => {
  //   if (isFocused) {
  //   }
  // }, [navigation, route, isFocused]);

  function showCategory(index) {
    // setValue(value => value + 1)
    navigation.navigate("View Category", { previous: "Category Manager", index: { index } })
  }

  function showCategories() {
    return (
      <View>
        {
          listOfCategories.length > 0 ?
            listOfCategories.map((object, index) => {
              return (
                <TouchableOpacity onPress={() => showCategory(index)}>
                  <Category key={object.title} title={object.title} color={object.color} color_icon={object.color_icon} index={index} value={value} setValue={setValue} />
                </TouchableOpacity>
              )
            })
            : <Text style={styles.placeHolderText}>Press the + button to add your first category</Text>
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
            onPress={() => navigation.navigate("Add a Category", { previous: "Category Manager" })}
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
              showCategories()
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
