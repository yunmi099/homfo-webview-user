import React, { useRef, useState } from 'react';
import { Text ,View, TextInput, Button, Alert } from 'react-native';
import { Container, StyledTextInput, StyledText, TextView, LoginButton,VerticalLine, TextButton, PurpleText} from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useUserStore } from '../../store/context/useUserStore';
import { signIn } from '../../store/api/login';
const Login = ({ navigation }: any) => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {userInfo, setUserInfo} = useUserStore();
  const onLoginEvent = async ()=>{
    if (await signIn(id, password, setUserInfo)){
      navigation.navigate('Home');  
    } else {
      setId("");
      setPassword("");
    }
  }
  
  return (
      <Container>
            <TextView>
                  <StyledText><PurpleText>안녕하세요:)</PurpleText>{"\n"}Homfo 입니다.</StyledText>
            </TextView>
            <StyledTextInput
              placeholder="아이디를 입력해주세요"
              placeholderTextColor ="lightgrey"
              value = {id}
              onChangeText={(text: string) => setId(text)}
              maxLength={15}
              autoCorrect={false}
              autoCapitalize={"none"}
            />
            <StyledTextInput
              placeholder="비밀번호를 입력해주세요"
              placeholderTextColor ="lightgrey"
              value = {password}
              onChangeText={(text: string) => setPassword(text)}
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize={"none"}
            />
            <LoginButton onPress={()=>onLoginEvent()}>
              <Text style={{fontSize:15, color:'white', fontWeight:"700"}}>로그인</Text>
            </LoginButton>
          <View style={{marginTop:20,flexDirection:'row', width:"100%", justifyContent:"center", alignItems:'center'}}>
            <TouchableOpacity  onPress={()=>navigation.navigate('아이디찾기')}><TextButton>아이디 찾기</TextButton></TouchableOpacity>
            <VerticalLine></VerticalLine>
            <TouchableOpacity  onPress={()=>navigation.navigate('비밀번호찾기')}><TextButton>비밀번호 찾기</TextButton></TouchableOpacity>
            <VerticalLine></VerticalLine>
            <TouchableOpacity onPress={()=>navigation.navigate('이용 약관 동의')}><TextButton>회원가입</TextButton></TouchableOpacity>
          </View>
      </Container>
    );
};

export default Login;