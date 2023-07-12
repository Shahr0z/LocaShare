import { StyleSheet } from "react-native";
import { Colors } from "../../Theme/Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    closeBtn: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: Colors.white,
        borderRadius: 30,
        elevation: 5,
        padding: 8,
    },
    distanceContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: Colors.white,
        borderRadius: 5,
        elevation: 5,
        padding: 10,
    },
    distanceText: {
        fontWeight: 'bold',
        color: Colors.black,
    },
});

export default styles;