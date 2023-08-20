import React from "react";
import { StyledView ,StyledText} from "./style";
interface HeaderProps {
  title?: string;
}

const ConfirmButton = ({ title }: HeaderProps) => {
  return (
   <StyledView><StyledText>{title}</StyledText></StyledView>
  );
};

export default ConfirmButton;
