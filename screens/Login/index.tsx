import React, { useRef, useState } from 'react';
import { Text ,View, TextInput, Button, Alert } from 'react-native';
import { Container, StyledTextInput, StyledText, TextView, LoginButton,VerticalLine, TextButton} from './style';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { signIn } from '../../store/api/login';
import { UserInfo } from '../../store/interface/login';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../recoil/loginAtom';
const Login = ({ navigation }: any) => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userInfo, setUserInfo]  = useRecoilState<UserInfo>(userAtom);
  const onLoginEvent = async ()=>{
    // if (await signIn(id, password, setUserInfo)){
      navigation.navigate('Home');
    // } else {
      setId("");
      setPassword("");
    // }
  }

  return (
    <Container>
          <TextView>
                <StyledText>안녕하세요:){"\n"}Homfo 입니다.</StyledText>
          </TextView>
          <StyledTextInput
            placeholder="아이디를 입력해주세요"
            value = {id}
            onChangeText={(text: string) => setId(text)}
            maxLength={15}
            autoCorrect={false}
            autoCapitalize={"none"}
          />
          <StyledTextInput
            placeholder="비밀번호를 입력해주세요"
            value = {password}
            onChangeText={(text: string) => setPassword(text)}
          />
           <LoginButton onPress={()=>onLoginEvent()}>
            <LinearGradient
              colors={['#3C02FF', '#842CFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{width:"100%", height: "100%", alignItems:'center', justifyContent:'center', borderRadius:7}}
            >

            <Text style={{fontSize:15, color:'white', fontWeight:"700"}}>로그인</Text>
           </LinearGradient>
          </LoginButton>
        <View style={{marginTop:20,flexDirection:'row', width:"100%", justifyContent:"center", alignItems:'center'}}>
          <TouchableOpacity  onPress={()=>navigation.navigate('아이디찾기')}><TextButton>아이디 찾기</TextButton></TouchableOpacity>
          <VerticalLine></VerticalLine>
          <TouchableOpacity  onPress={()=>navigation.navigate('비밀번호찾기')}><TextButton>비밀번호 찾기</TextButton></TouchableOpacity>
          <VerticalLine></VerticalLine>
          <TouchableOpacity onPress={()=>navigation.navigate('회원가입')}><TextButton>회원가입</TextButton></TouchableOpacity>
        </View>
    </Container>
    );
};

export default Login;