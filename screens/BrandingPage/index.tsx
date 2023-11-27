import React, { useEffect } from 'react';
import { View } from 'react-native';
import { branding } from '../../assets/initialImage';
import { StyledButton, StyledImage, StyledText } from './style';
import { storeData } from '../../utils/asyncStorage';

const Branding = ({ navigation }: any) => {
  return (
    <View style={{width:'100%', height:'100%'}}>
        <StyledImage source={branding}/>
        <StyledButton
        onPress={()=>{
            storeData("initial", "TRUE")
            navigation.navigate("로그인")
        }}>
            <StyledText>시작하기</StyledText>
        </StyledButton>
    </View>
    );
};

export default Branding;