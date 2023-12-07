import React from "react";
import { View, Text } from "react-native";

interface HeaderProps {
  title?: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
   <Text style={{marginLeft: '5.5%',marginTop: '3%', fontSize: 28.5, fontWeight:"400",color:'black'}}>{title}</Text>
  );
};

export default Header;
