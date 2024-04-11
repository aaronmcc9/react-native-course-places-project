import { useCallback, useState } from "react";
import { ScrollView, TextInput, Text, View, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../models/place";

function PlaceForm({ onCreatePlace }) {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [pickedLocation, setPickedLocation] = useState();
    const [takenImage, setTakenImage] = useState();


    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText)
    }

    function savePlaceHandler() {
        console.log(enteredTitle, pickedLocation, takenImage)
        const placeData = new Place(enteredTitle, takenImage, "", pickedLocation,)
        onCreatePlace(placeData)
    }

    function takePhotoHandler(imageUri) {
        setTakenImage(imageUri)
    }

    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location);
    }, [])


    return <ScrollView style={styles.form}>
        <View>
            <Text style={styles.label}>Title</Text>
            <TextInput onChangeText={changeTitleHandler}
                style={styles.input}
                value={enteredTitle} />
        </View>

        <ImagePicker onTakeImage={takePhotoHandler} />
        <LocationPicker onLocationPicked={pickLocationHandler} />
        <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
}

export default PlaceForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary700
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    },
})