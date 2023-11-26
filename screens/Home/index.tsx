import React, {useEffect, useRef, useState} from 'react';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { Alert, SafeAreaView } from 'react-native';
import { useUserStore } from '../../store/context/useUserStore';
const Home = ({ navigation }: any) => {
  const webViewRef = useRef<WebView>(null);
  const {userInfo} = useUserStore();
  const onMessage = (event: WebViewMessageEvent) => {
    const data = event.nativeEvent.data;

      switch (data){
          case "onLoad":
            webViewRef?.current?.postMessage(JSON.stringify(userInfo));
          default:
            if (data!=="React App"&&data!=="onLoad") {
              navigation.navigate("네이버 검색", {searchQuery: data})
             }
          break;
      }
  }

  return(
    <SafeAreaView style={{width:"100%", height:"100%",backgroundColor:'white'}}>
      <WebView
        ref={ webViewRef}
        originWhitelist={['*']}
        startInLoadingState
        // injectedJavaScript="window.ReactNativeWebView.postMessage(document.title)"
        // source={{uri: 'https://dev-webview.homfo.co.kr'}}
        source={{uri: 'http://localhost:3000'}}
        javaScriptEnabled={true}
        onMessage={onMessage}
        // mediaCapturePermissionGrantType="grant"
        // userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
        domStorageEnabled={true}
        cacheEnabled
        thirdPartyCookiesEnabled
        // allowsProtectedMedia
        // allowUniversalAccessFromFileURLs
        // allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
      />
    </SafeAreaView> 
  );
};
// source={{uri: 'https://development.web-user-c1x.pages.dev'}}
export default Home;