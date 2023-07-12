import React, { useState, useEffect } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLiveLocation, startLocationUpdates } from '../../DataBase';
import { Colors } from '../../Theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LiveLocCard } from '../../Components';

const LiveLoc = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [otherLocations, setOtherLocations] = useState(null);
    const [pressId, setPressId] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {

        const storeData = async () => {
            try {
                const uuid = await AsyncStorage.getItem('@Id');
                console.log('uuid', uuid);

                if (Platform.OS === 'android') {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        startLocationUpdates(uuid, (newLocation) => {
                            setLocation(newLocation)
                        });
                    }
                } else {
                    startLocationUpdates(uuid, (newLocation) => {
                        setLocation(newLocation)
                    });
                }
            } catch (err) {
                console.warn(err);
            }
        };

        storeData()

        return () => {
            Geolocation.stopObserving();
        };
    }, []);


    useEffect(() => {
        let unsubscribe;
        const allUsers = (users) => {
            // Check if the pressed user's location has changed
            const pressedUser = users.find((user) => user.id === pressId);
            if (pressedUser && (pressedUser.location.latitude !== otherLocations?.latitude || pressedUser.location.longitude !== otherLocations?.longitude)) {
                setOtherLocations({
                    latitude: pressedUser.location.latitude,
                    longitude: pressedUser.location.longitude,
                });
            }
            setUsers(users);
        };
        unsubscribe = getLiveLocation(allUsers);

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [pressId, otherLocations]);

    return (
        <View style={styles.container}>
            {location ? (
                <>
                    <MapView
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}>
                        {otherLocations && <Polyline coordinates={[location, otherLocations]} strokeWidth={5} strokeColor={Colors.blue} />}
                        {otherLocations && <Marker coordinate={otherLocations} />}
                        <Marker coordinate={location} />
                    </MapView>
                    <TouchableOpacity style={styles.closeBtn} onPress={() => { navigation.goBack() }}>
                        <AntDesign name="close" size={20} color={Colors.black} />
                    </TouchableOpacity>
                    <View style={styles.bottomView}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {users.map((item, index) => <LiveLocCard item={item} index={index} onPress={() => { setOtherLocations({ latitude: item?.location?.latitude, longitude: item?.location?.longitude }) + setPressId(item?.id) }} key={index} />)}
                        </ScrollView>
                    </View>
                </>
            ) : (
                <ActivityIndicator size="large" color={Colors.blue} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    closeBtn: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: Colors.white,
        borderRadius: 30,
        elevation: 5,
        padding: 8,
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 10,
    },
});

export default LiveLoc;