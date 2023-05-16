import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './screens/Main';
import Login from './screens/Login';
import Register from './screens/Regitster';
import Splash from './screens/Splash';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  
       screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: '#6C00F8',
        headerTitleStyle: {
          color:"black"
        },
       }}>
        <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
        <Stack.Screen name="로그인" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="회원가입" component={Register}/>
        <Stack.Screen name="Main" component={MainScreen}  options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;