import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { format } from "date-fns";
import ko from "date-fns/esm/locale/ko/index.js";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function DatePickerModal() {
  const [date, onChangeDate] = useState(null); 
  const [visible, setVisible] = useState(false);
  
  const todayDate = new Date();
  const year = todayDate.getFullYear();
    const adultYear = year - 19;

  const maxDate = new Date(adultYear, 11, 31);
  const onPressDate = () => { 
    setVisible(true); 
  };
  const onConfirm = (selectedDate: Date) => { 
    setVisible(false); 
    onChangeDate(selectedDate); 
  };
  const onCancel = () => { 
    setVisible(false); 
  };
  return (
    <View>
      <Pressable onPress={onPressDate}>
        {date?<Text style={TextStyle}>{format(new Date(date), 'PPP', {locale: ko})} </Text>:
        <Text style={{...TextStyle, color:'lightgrey', fontSize:15}}>yyyy / mm / dd</Text>}
      </Pressable>
      <DateTimePickerModal 
        isVisible={visible}
        mode={"date"}
        onConfirm={onConfirm}
        onCancel={onCancel}
        maximumDate={maxDate}
         />
    </View>
  );
}
const TextStyle = StyleSheet.create({
      marginHorizontal: 20,
      marginVertical: 3,
      height: 45,
      paddingLeft: 10,
      borderWidth:1,
      borderColor: "lightgrey", 
      lineHeight:45,
  });
export default DatePickerModal;