import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface HeaderProps {
  title?: string;
}

const NoneActiveButton = ({ title }: HeaderProps) => {
  return (
     <View style={{alignItems:'center', justifyContent:'center',width:"197%",borderWidth:1, height:30,borderRadius:20, borderColor:'#D1D1D1'}}><Text style={{fontWeight:'600', fontSize:12.5,color:'#D1D1D1', lineHeight:27}}>{title}</Text></View>
    
  );
};

export default NoneActiveButton;
