import React, {useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import { Alert, SafeAreaView } from 'react-native';
import { useRecoilState} from 'recoil';
import { userAtom } from '../../recoil/loginAtom';
const Home = () => {
  const webViewRef = useRef<WebView>(null);
  const [userInfo, setUserInfo] = useRecoilState(userAtom);
  useEffect(()=>{
    if (userInfo!==undefined){
      webViewRef?.current?.postMessage(JSON.stringify(userInfo))
      Alert.alert("사용자 정보 전송 !!!!")
    }
  },[userInfo])
  return(
    <SafeAreaView style={{width:"100%", height:"100%",backgroundColor:'white'}}>
      <WebView
        ref={ webViewRef}
        source={{uri: 'https://dev.homfo.co.kr/'}}
        // source={{uri: 'http://localhost:3000'}}
        // onMessage={onMessage}
        javaScriptEnabled={true}
      />
    </SafeAreaView> 
  );
};
// source={{uri: 'https://development.web-user-c1x.pages.dev'}}
export default Home;