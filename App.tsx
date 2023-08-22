import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/Login';
import Register from './screens/Regitster';
import Splash from './screens/Splash';
import Home from './screens/Home';
import FindID from './screens/FindAccount/FindID';
import FindPassword from './screens/FindAccount/FindPassword';
import ResultId from './screens/FindAccount/FindID/result';
import ResultPassword from './screens/FindAccount/FindPassword/result';
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen
          name="로그인"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
          <Stack.Screen
          name="아이디찾기"
          component={FindID}
          options={{
            title: '',
            headerBackTitleVisible: false,
            headerTintColor:'black',
            headerShadowVisible: false 
          }}
        />          
        <Stack.Screen
        name="아이디찾기결과"
        component={ResultId}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerTintColor:'black',
          headerShadowVisible: false 
        }}
      />
         <Stack.Screen
          name="비밀번호찾기"
          component={FindPassword}
          options={{
            title: '',
            headerBackTitleVisible: false,
            headerTintColor:'black',
            headerShadowVisible: false 
          }}
        />
        <Stack.Screen
          name="비밀번호찾기결과"
          component={ResultPassword}
          options={{
            title: '',
            headerBackTitleVisible: false,
            headerTintColor:'black',
            headerShadowVisible: false 
          }}
        />
        <Stack.Screen 
          name="회원가입" 
          component={Register}
          options={{
            title: '',
            headerBackTitleVisible: false,
            headerTintColor:'black',
            headerShadowVisible: false 
                  }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;