import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/Login';
import Register from './screens/Regitster';
import Splash from './screens/Splash';
import Home from './screens/Home';


const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="로그인" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="회원가입" component={Register}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;