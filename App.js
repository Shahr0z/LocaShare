import React, { useEffect } from 'react'
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from '@react-native-async-storage/async-storage'
import StackNavigation from './src/Navigations/Stack';

const App = () => {

    useEffect(() => { checkUUID() }, [])
    const checkUUID = async () => {
        const uuid = await AsyncStorage.getItem('@Id')
        console.log('uuid', uuid)
        if (!uuid) {
            const newUUID = uuidv4()
            AsyncStorage.setItem('@Id', newUUID)
            console.log('newUUID', newUUID)
        }
    }

    return <StackNavigation />
}
export default App