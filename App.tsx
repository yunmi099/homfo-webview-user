import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home/index';
import MainScreen from './screens/Main';

import Login from './screens/Login';
import Register from './screens/Regitster';
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  
       screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: 'purple',
        headerTitleStyle: {
          color:"black"
        },
    
       }}>
        <Stack.Screen name="로그인" component={Login}/>
        <Stack.Screen name="회원가입" component={Register}/>
        <Stack.Screen name="Main" component={MainScreen}  options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;