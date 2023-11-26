import React from 'react';
import { Container, TextContainer,PurpleText, NormalText} from './style';
import ConfirmButton from '../../components/button/confirmButton';
import { Image,} from 'react-native';
import { complete } from '../../assets/icons/register/registerIcon';

const RegisterComplete = ({ navigation }: any) => {
  return (
    <Container>
        <Image source={complete} style={{width: 70, height: 70}}/>
        <TextContainer style={{flexDirection:'row'}}>
            <PurpleText>회원가입</PurpleText><NormalText>이</NormalText>
        </TextContainer>
        <NormalText>완료되었습니다.</NormalText>
        <ConfirmButton title="로그인 하기" onPress={()=>navigation.navigate('로그인')}/>
    </Container>
    );
};

export default RegisterComplete;