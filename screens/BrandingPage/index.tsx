import React, { useEffect } from 'react';
import { View } from 'react-native';
import { branding } from '../../assets/initialImage';
import { StyledButton, StyledImage, StyledText } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Branding = ({ navigation }: any) => {
    const storeData = async (key:string, value:string) => {
        try {
          await AsyncStorage.setItem(key, value);
          console.log(`Data with key ${key} stored successfully.`);
        } catch (error) {
          console.error('Error storing data:', error);
        }
      };
      
      const getData = async (key:string) => {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value !== null) {
            console.log(`Data with key ${key} found: ${value}`);
            return value;
          } else {
            console.log(`Data with key ${key} not found.`);
            return null;
          }
        } catch (error) {
          console.error('Error retrieving data:', error);
          return null;
        }
      };    
      useEffect(() => {
        const checkInitialValue = async () => {
          try {
            const initialValue = await getData("initial");
            if (initialValue === "TRUE") {
              navigation.navigate("로그인");
            }
          } catch (error) {
            console.error('Error checking initial value:', error);
          }
        };
      
        checkInitialValue();
      }, []);
      
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