import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import { useEffect, useState } from "react";
import { StyleSheet, Text, Alert, Image, View } from "react-native";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker({ onTakeImage }) {
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    const [pickedImage, setPickedImage] = useState();


    async function verifyPermissions() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            //Asked user returns true if granted
            return permissionResponse.granted;
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert("Insufficient permissions.", "You need to grant camera permissions to use this app");
            return false;
        };

        return true;
    }

    useEffect(() => {
        onTakeImage(pickedImage);
        console.log("pickedImage", pickedImage)
    }, [pickedImage])

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission)
            return;

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });

        setPickedImage(image["assets"].length > 0 ? image["assets"][0]["uri"] : '');
    }

    let imagePreview = <Text>No image taken</Text>

    if (pickedImage)
        imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />

    return <View>
        <View style={styles.imagePreview}>{imagePreview}</View>
        <OutlinedButton icon="camera" onPress={takeImageHandler}>Take Image</OutlinedButton>
    </View>

}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    }
})