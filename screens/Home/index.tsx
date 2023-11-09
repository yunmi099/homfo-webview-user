import React, {useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import { SafeAreaView } from 'react-native';
const Home = () => {
  const ref = useRef<WebView>(null);
  return(
    <SafeAreaView style={{width:"100%", height:"100%",backgroundColor:'white'}}>
      <WebView
      source={{uri: 'https://https://dev.homfo.co.kr/'}}
      // source={{uri: 'http://localhost:3000'}}
      javaScriptEnabled={true}
      useWebKit={true}
      />
    </SafeAreaView>
  );
};
// source={{uri: 'https://development.web-user-c1x.pages.dev'}}
export default Home;