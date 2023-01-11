// react-navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity } from 'react-native';
import Detail from '../screen/Detail';
import Register from '../screen/Register';
import Home from '../screen/Home';
import Login from '../screen/Login';
import Edit from '../screen/Edit'

const Stack = createNativeStackNavigator();

export default function Stacks({ navigation: { goBack } }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
            <Text>← 뒤로</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Edit" component={Edit} />
    </Stack.Navigator>
  );
}


