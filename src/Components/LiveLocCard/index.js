import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../Theme/Colors'
import { googleMapImg } from '../../Theme/Images'

const LiveLocCard = ({ item, onPress, index }) => {
    return (
        <TouchableOpacity style={styles.cardView} key={item?.id} activeOpacity={0.9} onPress={onPress}>
            <View style={styles.rowView}>
                <Image source={googleMapImg} style={styles.img} resizeMode='contain' />
                <Text style={styles.userText}>User{index}</Text>
            </View>
            <Text style={styles.userText}>latitude: {item?.location?.latitude}</Text>
            <Text style={styles.userText}>longitude: {item?.location?.longitude}</Text>
        </TouchableOpacity>
    )
}

export default LiveLocCard

const styles = StyleSheet.create({

    cardView: {
        backgroundColor: Colors.white,
        borderRadius: 5,
        elevation: 5,
        marginTop: 10,
        width: 220,
        height: 100,
        padding: 10,
        marginRight: 10,
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    img: { height: 30, width: 30, borderRadius: 30 / 2 },
    userText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.black,
        marginLeft: 10,
        marginVertical: 5,
    },
})