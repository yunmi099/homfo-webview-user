import React from "react";
import { View, Text } from "react-native";

interface HeaderProps {
  title?: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
   <Text style={{marginLeft: '7.5%',marginTop: '3%', fontSize: 28, fontWeight:"500"}}>{title}</Text>
  );
};

export default Header;