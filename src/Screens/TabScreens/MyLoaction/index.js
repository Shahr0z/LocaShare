import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import propsType from 'prop-types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Colors } from '../../../Theme/Colors'
import { LocCard } from '../../../Components'

const MyLocation = ({ data, loading }) => {

    const [filterData, setFilterData] = useState([])

    useEffect(() => { getId() }, [data])

    const getId = async () => {
        const id = await AsyncStorage.getItem('@Id')
        setFilterData(data.filter(item => item.userId === id))
    }

    return (
        <>
            {loading ?
                <>
                    {filterData.length > 0 ?
                        <FlatList
                            data={filterData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => <LocCard item={item} share />}
                            contentContainerStyle={{ paddingBottom: '10%' }}
                        />
                        :
                        <View style={styles.noDataView}>
                            <Text style={styles.noData}>No Data Found</Text>
                        </View>
                    }
                </>
                :
                <View style={styles.noDataView}>
                    <ActivityIndicator size='large' color={Colors.black} />
                </View>
            }
        </>
    )
}

export default MyLocation

MyLocation.propsType = { data: propsType.array }

const styles = StyleSheet.create({
    noDataView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    noData: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.black
    }
})