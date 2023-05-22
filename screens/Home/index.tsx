import React, {useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import {WebViewNativeEvent} from 'react-native-webview/lib/WebViewTypes';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';
const Home = () => {
  const ref = useRef<WebView>(null);
  return(
    <SafeAreaView style={{width:"100%", height:"100%"}}>
      <WebView
      source={{uri: 'https://development.web-user-c1x.pages.dev'}}
      javaScriptEnabled={true}
      useWebKit={true}
      />
    </SafeAreaView>
  );
};

export default Home;