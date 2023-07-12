import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../Theme/Colors'

const Header = ({ navigation }) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Live Location Tracker</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerContainer: {
        height: 60,
        backgroundColor: Colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },
    headerText: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: 'bold',
    },

})