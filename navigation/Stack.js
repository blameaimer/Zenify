import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import Meditation from '../Screens/Meditation';
import Setting from '../Screens/Setting';

const Stack = createStackNavigator();

export default function MyStack() {


  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerMode: 'float',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Awesome app',
        }}
      />
      <Stack.Screen
        name="Meditation"
        component={Meditation}
        options={{
          title: 'My profile',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Setting}
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}