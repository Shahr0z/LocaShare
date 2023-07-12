import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { Colors } from '../../Theme/Colors'
import propTypes from 'prop-types'

const FloatBtn = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.floatBtn} onPress={onPress}>
            <Feather name="plus" size={24} color={Colors.white} />
        </TouchableOpacity>
    )
}

export default FloatBtn

FloatBtn.propTypes = { onPress: propTypes.func }

const styles = StyleSheet.create({
    floatBtn: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        height: 60,
        width: 60,
        borderRadius: 60 / 2,
        backgroundColor: Colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
})