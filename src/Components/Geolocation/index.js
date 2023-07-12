import Geolocation from 'react-native-geolocation-service';

export const getLocation = (getPosition) => {
    Geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords
            getPosition({ latitude, longitude })
        },
        (error) => {
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
}