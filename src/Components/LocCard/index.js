import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../Theme/Colors'
import { googleMapImg } from '../../Theme/Images'
import propTypes from 'prop-types'
import Feather from 'react-native-vector-icons/Feather'
import { shareUrl } from '../../Permissions'

const LocCard = ({ item, onPress, share }) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${item?.latitude},${item?.longitude}`;
    return (
        <TouchableOpacity style={styles.cardView} activeOpacity={0.9} onPress={onPress}>
            <View style={styles.ImgOrTitle}>
                <Image source={googleMapImg} style={styles.imgStyle} />
                <Text style={styles.titleStyle}>{item?.locationTitle}</Text>
            </View>
            <View style={styles.rowView}>
                <Text style={styles.titleText}>Latitude</Text>
                <Text style={styles.titleText}>{item?.latitude}</Text>
            </View>
            <View style={styles.rowView}>
                <Text style={styles.titleText}>Longitude</Text>
                <Text style={styles.titleText}>{item?.longitude}</Text>
            </View>
            {share && <TouchableOpacity style={styles.shareBtn} activeOpacity={0.9} onPress={() => { shareUrl(url) }}>
                <Feather name='share-2' size={15} color={Colors.white} />
            </TouchableOpacity>}
        </TouchableOpacity>
    )
}

export default LocCard

LocCard.propTypes = { item: propTypes.object, onPress: propTypes.func }

const styles = StyleSheet.create({
    cardView: {
        height: 160,
        width: '90%',
        backgroundColor: Colors.white,
        alignSelf: 'center',
        marginTop: '5%',
        borderRadius: 10,
        elevation: 5,
        padding: '5%',
    },
    titleStyle: { color: Colors.black, fontSize: 18, fontWeight: 'bold', marginLeft: '5%', color: '#000000' },
    ImgOrTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgStyle: {
        height: 60,
        width: 60,
        borderRadius: 60 / 2
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '5%',
    },
    titleText: {
        color: Colors.black,
        fontSize: 16,
        fontWeight: 'bold',
    },
    shareBtn: { backgroundColor: Colors.blue, height: 30, width: 30, borderRadius: 30 / 2, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 10, top: 10 }
})