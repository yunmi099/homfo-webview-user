import React, {useEffect, useRef, useState} from 'react';
import { Alert, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
import {  WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';

const Agreement = ({ navigation }: any) => {
  const webViewRef = useRef<WebView>(null);
  const onMessage = (event: WebViewMessageEvent) => {
    const data = event.nativeEvent.data;
    if (data === "register") {
        navigation.navigate('회원가입')
    }
  };
  
  return(
      <WebView
        ref={ webViewRef}
        originWhitelist={['*']}
        startInLoadingState
        injectedJavaScript="window.ReactNativeWebView.postMessage(document.title)"
        source={{uri: 'https://dev-webview.homfo.co.kr/system/agreement-of-termsofuse'}}
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
  );
};
// source={{uri: 'https://development.web-user-c1x.pages.dev'}}
export default Agreement;