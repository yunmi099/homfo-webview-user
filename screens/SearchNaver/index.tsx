import React, {useRef, useState} from 'react';
import { Alert, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';

const SearchScreen = ({ navigation , route}: any) => {
  const webViewRef = useRef<WebView>(null);
  return(
    <SafeAreaView style={{width:"100%", height:"100%",backgroundColor:'white'}}>
    {
        route.params.searchQuery!==undefined ?       
        <WebView
        ref={ webViewRef}
        originWhitelist={['*']}
        startInLoadingState
        source={{uri: `https://m.search.naver.com/search.naver?query=${route.params.searchQuery}`}}
        javaScriptEnabled={true}
        mediaCapturePermissionGrantType="grant"
        userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
        domStorageEnabled
        cacheEnabled
        thirdPartyCookiesEnabled
        allowsProtectedMedia
        allowUniversalAccessFromFileURLs
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
      />:null
    }

    </SafeAreaView> 
  );
};
// source={{uri: 'https://development.web-user-c1x.pages.dev'}}
export default SearchScreen;