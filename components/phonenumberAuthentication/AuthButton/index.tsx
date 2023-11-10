import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface HeaderProps {
  title?: string;
}

const AuthButton = ({ title }: HeaderProps) => {
  return (
        <LinearGradient
              colors={['#3300FF', '#9614FF']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0}}
              style={{alignItems:'center', justifyContent:'center', height:29, width:"200%",borderRadius:20}}
              >
                <View style={{alignItems:'center', justifyContent:'center',width:"99%", height:27.5, backgroundColor:'white',borderRadius:20}}><Text style={{color:'#842CFF', fontWeight:'600', fontSize:12.5}}>{title}</Text></View>
        </LinearGradient>
    
  );
};

export default AuthButton;
