import { Modal, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../Theme/Colors'
import { getAllLocations } from '../../DataBase'
import { AllLocation, MyLocation } from '../TabScreens'
import { FloatBtn, Header, LocModal, TopTab } from '../../Components'

const Home = () => {
    const [locModal, setLocModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [locData, setLocData] = useState([])

    useEffect(() => { getAllData() }, [locModal])

    const getAllData = async () => {
        setLoading(true)
        const data = await getAllLocations()
        setLocData(data)
    }

    const renderContent = (selectedTab) => {
        if (selectedTab === 0) { return <MyLocation data={locData} loading={loading} /> }
        return <AllLocation data={locData} loading={loading} />
    }

    return (
        <View style={styles.mainContainer}>
            <Header />

            <TopTab tabNames={tabNames} renderContent={(selectedTab) => (renderContent(selectedTab))} />

            <FloatBtn onPress={() => setLocModal(true) + getAllData()} />

            <Modal visible={locModal} transparent={true} animationType='fade'>
                <LocModal onClose={() => setLocModal(false)} />
            </Modal>

        </View>
    )
}

export default Home

const tabNames = ['My Location', 'All Location']

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white,
    },
})