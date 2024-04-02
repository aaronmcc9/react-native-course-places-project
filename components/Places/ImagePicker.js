import { launchCameraAsync } from "expo-image-picker";
import { Button, View } from "react-native";

function ImagePicker() {

    async function takeImageHandler() {
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
    }

    return <View>
        <View>

        </View>
        <Button title="Take Image" onPress={takeImageHandler}></Button>
    </View>

}

export default ImagePicker;