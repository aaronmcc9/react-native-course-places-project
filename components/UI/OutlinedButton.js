import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { Colors } from "../../constants/colors";

function OutlinedButton({ onPress, icon, children }) {
    return <Pressable style={({ pressed }) => [styles.buttons, !!pressed && styles.pressed]}
        onPress={onPress}>
        <Ionicons style={styles.icon} name={icon} size={18} color={Colors.primary500} />
        <Text style={styles.text}>{children}</Text>
    </Pressable>
}

export default OutlinedButton;

const styles = StyleSheet.create({
    buttons: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.primary500
    },
    pressed: {
        opacity: 0.75
    },
    icon: {
        marginRight: 6
    },
    text: {
        color: Colors.primary500
    },

})