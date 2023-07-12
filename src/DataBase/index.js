import firestore from '@react-native-firebase/firestore';
import { ToastAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';


// Function to add data to the table
export const addLocationToTable = (userId, longitude, latitude, locationTitle) => {
    const usersCollection = firestore().collection('locations');
    usersCollection
        .add({
            userId: userId,
            longitude: longitude,
            latitude: latitude,
            locationTitle: locationTitle,
        })
        .then(() => {
            ToastAndroid.show('Location added successfully', ToastAndroid.SHORT);
        }
        )
        .catch((error) => {
            console.log('Error adding location:', error);
            ToastAndroid.show('Error adding location', ToastAndroid.SHORT);
        }
        );
};


// Function to get all data from the "locations" collection
export const getAllLocations = async () => {
    const querySnapshot = await firestore().collection('locations').get();
    const locations = querySnapshot.docs.map(doc => doc.data())
    return locations;
}

// Function to update live location
export const startLocationUpdates = (uuid, onLocationUpdate) => {
    Geolocation.getCurrentPosition(
        (position) => {
            console.log(position);
            const { latitude, longitude } = position.coords;

            const userRef = firestore().collection('users').doc(uuid);

            userRef.get().then((doc) => {
                if (doc.exists) {
                    userRef.update({
                        location: new firestore.GeoPoint(latitude, longitude),
                        updatedAt: firestore.FieldValue.serverTimestamp(),
                        userId: uuid,
                    });
                } else {
                    userRef.set({
                        location: new firestore.GeoPoint(latitude, longitude),
                        updatedAt: firestore.FieldValue.serverTimestamp(),
                        userId: uuid,
                    });
                }
            });

            onLocationUpdate({ latitude, longitude });
        },
        (error) => {
            console.log(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
        }
    );
};


export const getLiveLocation = (allUsers) => {
    firestore()
        .collection('users')
        .onSnapshot((querySnapshot) => {
            const users = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                users.push({
                    id: doc.id,
                    location: data.location,
                    updatedAt: data.updatedAt,
                });
            });
            console.log('users', users)
            allUsers(users);
        });
}