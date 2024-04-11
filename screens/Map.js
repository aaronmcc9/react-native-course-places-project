import MapView, { Marker } from 'react-native-maps'
import { Alert, StyleSheet } from 'react-native';
import { useCallback, useLayoutEffect, useState } from 'react';
import IconButton from '../components/UI/IconButton';

function Map({ navigation }) {
    const [selectedLocation, setSelectedLocation] = useState();

    const region = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    function selectLocationHandler(event) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({ lat: lat, lng: lng })

    }

    //use callback prevents function running unnecessarily
    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert("No location picked", "Pick a location by tapping on the map")
            return;
        }

        navigation.navigate('AddPlace', {
            pickedLat: selectedLocation.lat,
            pickedLng: selectedLocation.lng
        })

        //runs only when below two properties change like use effect
    }
        //pass parameter to previous screen (form screen)
        , [navigation, selectedLocation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) => <IconButton icon="save" size={24} color={tintColor} onPress={savePickedLocationHandler} />
        })
    }, [navigation, savePickedLocationHandler])

    return (<MapView onPress={selectLocationHandler} style={styles.map} initialRegion={region}>
        {selectedLocation && <Marker
            title="Picked Location"
            coordinate={{
                latitude: selectedLocation.lat,
                longitude: selectedLocation.lng
            }}
        >

        </Marker>}
    </MapView>)
}

export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})