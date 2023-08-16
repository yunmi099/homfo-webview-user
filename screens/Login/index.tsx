import React, { useState } from 'react';
import { Text ,View, TextInput, Button } from 'react-native';
import { Container, StyledTextInput, StyledText, TextView, LoginButton,VerticalLine, TextButton} from './style';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Login = ({ navigation }: any) => {
  return (
    <Container>
          <TextView>
                <StyledText>안녕하세요:){"\n"}Homfo 입니다.</StyledText>
          </TextView>
          <StyledTextInput
            placeholder="아이디를 입력해주세요"
          />
          <StyledTextInput
            placeholder="비밀번호를 입력해주세요"
          />
           <LoginButton onPress={()=>navigation.navigate('Home')}>
            <LinearGradient
              colors={['#3C02FF', '#842CFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{width:"100%", height: "100%", alignItems:'center', justifyContent:'center', borderRadius:11}}
            >

            <Text style={{fontSize:15, color:'white', fontWeight:"500"}}>로그인</Text>
           </LinearGradient>
          </LoginButton>
        <View style={{marginTop:20,flexDirection:'row', width:"100%", justifyContent:"center", alignItems:'center'}}>
          <TouchableOpacity><TextButton>아이디 찾기</TextButton></TouchableOpacity>
          <VerticalLine></VerticalLine>
          <TouchableOpacity><TextButton>비밀번호 찾기</TextButton></TouchableOpacity>
          <VerticalLine></VerticalLine>
          <TouchableOpacity><TextButton>회원가입</TextButton></TouchableOpacity>
        </View>
    </Container>
    );
};

export default Login;