import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { completeTask, task_list, completed_task_list } from '../storage/saveInput';
import { Ionicons } from '@expo/vector-icons';

const Category = (props) => {
    return (
        <View style={styles(props).container}>
            {/* <TouchableOpacity onPress={() => showCategory(props.index)}> */}
                <View style={styles(props).item}>
                    <View style={styles(props).itemLeft}>
                        <View style={styles(props).square}></View>
                        <Text style={styles(props).itemText}>{props.title}</Text>
                    </View>
                </View>
            {/* </TouchableOpacity> */}
        </View>
    )
}

const styles = (props) => StyleSheet.create({
    item: {
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
    square: {
        width: 51,
        height: 51,
        backgroundColor: props.color,
        marginRight: 15,
    },
    itemText: {
        fontSize: 24,
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 5,
    },
});

export default Category;