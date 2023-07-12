import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native"
import Home from '../../Screens/Home';
import MapModal from '../../Screens/Map';
import LiveLoc from '../../Screens/LiveLoc';

const Stack = createStackNavigator();
const StackNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="MapModal" component={MapModal} screenOptions={{ presentation: 'modal' }} />
                <Stack.Screen name="LiveLoc" component={LiveLoc} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default StackNavigation