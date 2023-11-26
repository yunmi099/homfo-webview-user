import React,{useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from "react-native-splash-screen";
import Login from './screens/Login';
import Register from './screens/Regitster';
import Home from './screens/Home';
import FindID from './screens/FindAccount/FindID';
import FindPassword from './screens/FindAccount/FindPassword';
import ResultId from './screens/FindAccount/FindID/result';
import ResultPassword from './screens/FindAccount/FindPassword/result';
import Agreement from './screens/Agreement';
const Stack = createStackNavigator();
import SearchScreen from './screens/SearchNaver';
import RegisterComplete from './screens/RegisterComplete';
import Branding from './screens/BrandingPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
const App = () =>  {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000); //스플래시 활성화 시간
  });
  const getData = async (key:string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log(`Data with key ${key} found: ${value}`);
        return value;
      } else {
        console.log(`Data with key ${key} not found.`);
        return null;
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  };    
  const checkInitialValue = async () => {
      try {
        const initialValue = await getData("initial");
        if (initialValue === "TRUE") {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error checking initial value:', error);
        return false;
      }
  };
  checkInitialValue();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ !checkInitialValue()? "Splash" : "로그인"}>
          <Stack.Screen
            name="Splash"
            component={Branding}
            options={{
              headerShown: false,
              gestureEnabled: false, 
            }}
          />
          <Stack.Screen
            name="로그인"
            component={Login}
            options={{
              headerShown: false,
              gestureEnabled: false, 
            }}
          />
          <Stack.Screen
              name="Home" 
              component={Home}
              options={{
                headerShown:false,
                gestureEnabled: false,
          }}/>
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
        <Stack.Screen 
          name="이용 약관 동의" 
          component={Agreement}
          options={{
            title: '',
            headerBackTitleVisible: false,
            headerTintColor:'black',
            headerShadowVisible: false 
        }}/>
        <Stack.Screen 
          name="네이버 검색" 
          component={SearchScreen}
          options={{
            title: '',
            headerBackTitleVisible: false,
            headerTintColor:'black',
            headerShadowVisible: false 
        }}/>
      <Stack.Screen 
          name="회원가입 완료" 
          component={RegisterComplete}
          options={{
            headerShown: false,
            gestureEnabled: false, 
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;