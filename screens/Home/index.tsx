import React, {useEffect, useRef, useState} from 'react';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { Alert, SafeAreaView } from 'react-native';
import { useUserStore } from '../../store/context/useUserStore';
import { clearAsyncStorage, removeData, storeData } from '../../utils/asyncStorage';

const Home = ({ navigation }: any) => {
  const webViewRef = useRef<WebView>(null);
  const {userInfo} = useUserStore();
  const [webViewKey, setWebViewKey] = useState<number>(0); // 상태 추가

  useEffect(()=>{
    if (userInfo !==undefined){
      storeData("token", userInfo.token)
    }
  },[userInfo])
  const onMessage = (event: WebViewMessageEvent) => {
    const data = event.nativeEvent.data;
      switch (data){
          case "onLoad":
            webViewRef?.current?.postMessage(JSON.stringify(userInfo));
            break;
          case "tokenExpired":
            navigation.navigate("로그인");
            break;
          case "logout":
            navigation.navigate("로그인");
            removeData("token");
            setWebViewKey((prevKey) => prevKey + 1); // WebView 리로드
            break;
          case "withDrawal":
            navigation.navigate("브랜딩");
            clearAsyncStorage();
            setWebViewKey((prevKey) => prevKey + 1); // WebView 리로드
            break;
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
        key={webViewKey} // key를 변경하여 리로드
        ref={ webViewRef}
        originWhitelist={['*']}
        startInLoadingState
        injectedJavaScript="window.ReactNativeWebView.postMessage(document.title)"
        source={{uri: 'https://dev-webview.homfo.co.kr'}}
        javaScriptEnabled={true}
        onMessage={onMessage}
        mediaCapturePermissionGrantType="grant"
        userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
        domStorageEnabled={true}
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