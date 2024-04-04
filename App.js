import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import { Colors } from './constants/colors';
import IconButton from './components/UI/IconButton';
import Map from './screens/Map';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 }
        }}>
          <Stack.Screen name="AllPlaces" component={AllPlaces}
            options={({ navigation }) => ({
              headerRight: ({ tintColor }) => <IconButton icon="add" size={24} color={tintColor} onPress={() => navigation.navigate("AddPlace")} />,
              title: 'Your Favorite Places'
            })}
          />
          <Stack.Screen name="AddPlace" component={AddPlace}
            options={{
              title: 'Add A New place'
            }}
          />
          <Stack.Screen name="Map" component={Map}
            options={{
              title: 'Map'
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>

    </>
  );
}