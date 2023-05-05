import React,{useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Button, Text} from 'react-native';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from '../Home';
const Tab = createBottomTabNavigator();
function MainScreen() {

  return (
    <Tab.Navigator
      initialRouteName="Home"
     >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: '홈',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
          // headerShown:false,
          

        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: '지도',
          tabBarIcon: ({color, size}) => (
            <Icon name="map" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          title: '요청하기',
          tabBarIcon: ({color, size}) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{
          title: '요청사항',
          tabBarIcon: ({color, size}) => (
            <Icon name="message" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function SearchScreen() {
  return(
  <WebView
    source={{uri: 'https://dev-webview.ajou-only-five.shop/map'}}
    javaScriptEnabled={true}
    useWebKit={true}
    />);     

}

function NotificationScreen() {
  return <Text>요청하기</Text>;
}

function MessageScreen() {
  return <Text>요청사항</Text>;
}

export default MainScreen;