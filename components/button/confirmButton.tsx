import React from "react";
import { StyledView ,StyledText} from "./style";
interface HeaderProps {
  title?: string;
  navigation:any;
  location: string;
}

const ConfirmButton = ({ title, navigation, location }: HeaderProps) => {
  return (
   <StyledView onPress={()=>navigation.navigate(location)}><StyledText>{title}</StyledText></StyledView>
  );
};

export default ConfirmButton;
