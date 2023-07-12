import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import propsType from 'prop-types'
import { Colors } from '../../../Theme/Colors'
import { LocCard } from '../../../Components'
import { useNavigation } from '@react-navigation/native'

const AllLocation = ({ data, loading }) => {
    const navigation = useNavigation()
    return (
        <>
            {loading ?
                <>
                    {data.length > 0 ?
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => <LocCard item={item} onPress={() => navigation.navigate('MapModal', { destination: destination = { latitude: item?.latitude, longitude: item?.longitude } })} />}
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

export default AllLocation

AllLocation.propsType = { data: propsType.array }

const styles = StyleSheet.create({
    noDataView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    noData: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.black
    },
})