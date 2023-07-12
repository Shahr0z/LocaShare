import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../Theme/Colors'
import Proptypes from 'prop-types'
import { gifMap } from '../../Theme/Images'
import { useNavigation } from '@react-navigation/native'

const TopTab = ({ tabNames, renderContent }) => {
    const navigation = useNavigation();
    const [selectedTab, setSelectedTab] = useState(0);
    return (
        <>
            <View style={styles.tabContainer}>
                {tabNames.map((item, index) => (
                    <TouchableOpacity key={index} style={[styles.tabView, { backgroundColor: selectedTab === index ? Colors.blue : Colors.white }]} onPress={() => setSelectedTab(index)}>
                        <Text style={[styles.tabText, { color: selectedTab === index ? Colors.white : Colors.black }]}>{item}</Text>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity style={styles.liveBtn} onPress={() => navigation.navigate('LiveLoc')}>
                    <Image source={gifMap} style={{ height: 40, width: 40 }} resizeMode='contain' />
                </TouchableOpacity>
            </View>
            <>
                {renderContent(selectedTab)}
            </>
        </>
    )
}

export default TopTab

TopTab.propTypes = {
    tabNames: Proptypes.array.isRequired,
    renderContent: Proptypes.func.isRequired,
}

const styles = StyleSheet.create({
    tabContainer: {
        paddingVertical: '2%',
        backgroundColor: Colors.white,
        marginTop: '5%',
        flexDirection: 'row',
    },
    tabView: {
        height: 40,
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        elevation: 5,
        marginHorizontal: '4%'
    },
    tabText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    liveBtn: {
        height: 40,
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        elevation: 5,
        marginHorizontal: '4%',
        backgroundColor: '#414257'
    }
})