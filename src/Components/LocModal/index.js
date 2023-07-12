import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors } from '../../Theme/Colors'
import propsType from 'prop-types'
import { addLocationToTable } from '../../DataBase'
import "react-native-get-random-values";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { handleLocationPermission } from '../../Permissions'

const LocModal = ({ onClose }) => {

    const [location, setLocation] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isloading, setIsLoading] = useState(false)
    const [title, setTitle] = useState('')

    const handleGetPosition = (newLocation) => {
        setLocation(newLocation);
        setLoading(false);
        console.log('newLocation', newLocation);
    }

    const handleGetPermission = () => {
        setLoading(true)
        handleLocationPermission(handleGetPosition);
    }

    const sendData = async () => {
        setIsLoading(true)
        const id = await AsyncStorage.getItem('@Id')
        if (id) {
            addLocationToTable(id, location?.longitude, location?.latitude, title)
            setIsLoading(false)
            onClose()
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.dataContainer}>
                <View style={styles.inputView}>
                    <Text style={styles.titleText}>Enter Loction Title</Text>
                    <TextInput style={styles.inputStyle} value={title} onChangeText={(text) => setTitle(text)} />
                </View>

                <TouchableOpacity style={styles.btnStyle} activeOpacity={0.8} onPress={handleGetPermission}>
                    {loading ? <ActivityIndicator size='small' color={Colors.white} /> : <Text style={styles.btnText}>Get My Location</Text>}
                </TouchableOpacity>

                {
                    location &&
                    <>
                        <View style={styles.rowView}>
                            <Text style={styles.titleText}>Longitude</Text>
                            <Text style={styles.titleText}>{location?.longitude}</Text>
                        </View>
                        <View style={styles.rowView}>
                            <Text style={styles.titleText}>Latitude</Text>
                            <Text style={styles.titleText}>{location?.latitude}</Text>
                        </View>
                        <TouchableOpacity style={styles.btnStyle} activeOpacity={0.8} onPress={sendData}>
                            {isloading ? <ActivityIndicator size='small' color={Colors.white} /> : <Text style={styles.btnText}>Save My Location</Text>}
                        </TouchableOpacity>
                    </>
                }

                <TouchableOpacity style={styles.clodeBtn} activeOpacity={0.8} onPress={onClose}>
                    <AntDesign name='close' size={22} color={Colors.black} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LocModal

LocModal.propsType = { onClose: propsType.func }

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dataContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: '5%',
        elevation: 5,
        // position: 'relative',
    },
    inputView: {
        marginTop: '5%',
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
    },
    inputStyle: {
        height: 40,
        width: '100%',
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: '5%',
        paddingLeft: '2%',
        color: '#000000',
    },
    btnStyle: {
        height: 40,
        width: '100%',
        backgroundColor: '#000000',
        borderRadius: 4,
        marginTop: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    clodeBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
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

})