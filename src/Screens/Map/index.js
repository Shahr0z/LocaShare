import React, { useState, useEffect, useRef } from 'react';
import { View, PermissionsAndroid, TouchableOpacity, Text, ToastAndroid, ActivityIndicator, } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../Theme/Colors';
import propTypes from 'prop-types';
import { getDistance } from 'geolib';
import styles from './styles';

const MapModal = ({ route, navigation }) => {
    const { destination } = route.params
    const mapRef = useRef(null);
    const [curLocation, setCurLocation] = useState(null);
    const [error, setError] = useState(null);
    const [distance, setDistance] = useState(null);
    const [mapReady, setMapReady] = useState(false);

    useEffect(() => {
        handleLocationPermission();
        if (curLocation && destination && mapReady) {
            fitMapToPolyline();
        }
    }, [mapReady]);

    const handleLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'App needs access to your location ',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                handleLocation();
            } else {
                setError('Location permission denied');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                console.log('position', position.coords)
                setCurLocation({ latitude, longitude });
                setError(null);

                if (destination) {
                    const distanceInMeters = getDistance(
                        { latitude, longitude },
                        destination
                    );
                    setDistance(distanceInMeters);
                }
            },
            error => setError(error.message),
            { enableHighAccuracy: true, distanceFilter: 10 }
        );
    };

    const fitMapToPolyline = () => {
        mapRef.current.fitToCoordinates(
            [curLocation, destination],
            {
                edgePadding: { top: 20, right: 20, bottom: 20, left: 20 },
                animated: true,
            }
        );
    };

    if (error) { ToastAndroid.show(error, ToastAndroid.SHORT); }

    if (curLocation) {
        return (
            <View style={styles.container}>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    region={{
                        latitude: curLocation.latitude,
                        longitude: curLocation.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={false}
                    zoomControlEnabled={true}
                    showsCompass={true}
                    onMapReady={() => setMapReady(true)}
                >

                    <Polyline
                        coordinates={[curLocation, destination]}
                        strokeColor={Colors.blue}
                        strokeWidth={3}
                        lineCap={"butt"}
                        geodesic={true}
                    />

                    <Marker coordinate={destination} title='Destination' description='Destination' />
                    <Marker coordinate={curLocation} title='Current Location' description='Current Location' />
                </MapView>
                {distance && (
                    <View style={styles.distanceContainer}>
                        <Text style={styles.distanceText}>Distance: {distance / 1000} KM</Text>
                    </View>
                )}
                <TouchableOpacity style={styles.closeBtn} onPress={() => { navigation.goBack() }}>
                    <AntDesign name="close" size={20} color={Colors.black} />
                </TouchableOpacity>
            </View>
        );
    }

    // handle loading
    return <ActivityIndicator size="large" color={Colors.black} />;
};

export default MapModal;

MapModal.propTypes = {
    onClose: propTypes.func,
    destination: propTypes.object,
};