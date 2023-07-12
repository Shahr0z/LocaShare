import { Linking, PermissionsAndroid, Share } from "react-native";
import { getLocation } from "../Components/Geolocation";

export const handleLocationPermission = async (getPosition) => {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            title: "Location Permission",
            message: "App needs access to your location ",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
        }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation(getPosition);
    } if (granted === 'never_ask_again') {
        Linking.openSettings()
    } else {
        console.log('error', granted);
    }
}

export const shareUrl = async (url) => {
    try {
        const result = await Share.share({
            message: url,
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                console.log('shared with activity type of result.activityType');
            } else {
                console.log('shared');
            }
        } else if (result.action === Share.dismissedAction) {
            console.log('dismissed');
        }
    } catch (error) {
        console.log(error.message);
    }
};
