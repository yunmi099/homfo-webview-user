import React, {useEffect, useRef, useState} from 'react';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { Alert, SafeAreaView } from 'react-native';
import { useUserStore } from '../../store/context/useUserStore';
const Home = ({ navigation }: any) => {
  const webViewRef = useRef<WebView>(null);
  const {userInfo} = useUserStore();
  useEffect(()=>{
    if (userInfo!==undefined){
      webViewRef?.current?.postMessage(JSON.stringify(userInfo))
      Alert.alert("사용자 정보 전송 !!!!")
    }
  },[userInfo])
  const onMessage = (event: WebViewMessageEvent) => {
    const data = event.nativeEvent.data;
     if (data!=="React App") {
      navigation.navigate("네이버 검색", {searchQuery: data})
     }

  };
  return(
    <SafeAreaView style={{width:"100%", height:"100%",backgroundColor:'white'}}>
      <WebView
        ref={ webViewRef}
        originWhitelist={['*']}
        startInLoadingState
        injectedJavaScript="window.ReactNativeWebView.postMessage(document.title)"
        // source={{uri: 'https://dev.homfo.co.kr'}}
        source={{uri: 'http://localhost:3000'}}
        javaScriptEnabled={true}
        onMessage={onMessage}
        mediaCapturePermissionGrantType="grant"
        userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
        domStorageEnabled
        cacheEnabled
        thirdPartyCookiesEnabled
        allowsProtectedMedia
        allowUniversalAccessFromFileURLs
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
      />
    </SafeAreaView> 
  );
};
// source={{uri: 'https://development.web-user-c1x.pages.dev'}}
export default Home;