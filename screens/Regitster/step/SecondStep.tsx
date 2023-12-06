import React, { useState } from 'react'
import { StyledText, StyledTextInput, HorizontalLine, CommentText, StyledView, StyledImage, GenderView, GenderContainer, GenderText, NGenderText, NGenderView, MiniText } from '../style'
import RNPickerSelect from 'react-native-picker-select';
import DatePickerModal from '../DateTimePicker';
import { Image, StyleSheet, Text, View } from 'react-native';
import { UserFormData } from '../../../store/interface/userForm';
import * as registerIcon from '../../../assets/icons/register/registerIcon'
import LinearGradient from 'react-native-linear-gradient';
interface registerProps {
    formData: UserFormData;
    setFormData:  React.Dispatch<React.SetStateAction<UserFormData>>;
    onChangeText: (name: string, value: string) => void;
    detailJob: string;
    setDetailJob: React.Dispatch<React.SetStateAction<string>>;
}
export const SecondStep = ({formData, setFormData, onChangeText, detailJob, setDetailJob}: registerProps)=>{
    const [jobSetting, setJob] = useState<boolean>(false);
    const jobHandleEvent = (value:string)=>{
        if (value === '기타'){
          setJob(true);
        } else {
          setJob(false);
        }
        onChangeText("job", value);
      } 
    return(
    <>
          <StyledText>성별<MiniText>&nbsp;&nbsp;(선택)</MiniText></StyledText>
          <GenderContainer>
            {
              formData.gender === "M" ?             
            <LinearGradient
              colors={['#842CFF', '#3E74FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{alignItems:'center', width: '43.2%', height: 45,justifyContent:'center', borderRadius:5}}
            >
              <GenderView onPress={()=>onChangeText("gender", "")}><GenderText>남성</GenderText></GenderView> 
            </LinearGradient> 
            : <NGenderView onPress={()=>onChangeText("gender", "M")}><NGenderText>남성</NGenderText></NGenderView>
            }  
            {
              formData.gender === "W" ?             
            <LinearGradient
              colors={['#842CFF', '#3E74FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{alignItems:'center', width: '43.2%', height: 45,justifyContent:'center', borderRadius:5}}
            >
              <GenderView onPress={()=>onChangeText("gender", "")}><GenderText>여성</GenderText></GenderView> 
            </LinearGradient> 
            : <NGenderView onPress={()=>onChangeText("gender", "W")}><NGenderText>여성</NGenderText></NGenderView>
            }    
          </GenderContainer>
          <StyledText>직업<MiniText>&nbsp;&nbsp;(선택)</MiniText></StyledText>
          <StyledView>
            <RNPickerSelect
              textInputProps={{ underlineColorAndroid: 'transparent' }}
              placeholder={{
                label: "선택",
              }}
              fixAndroidTouchableBug={true}
              value={formData.job}
              onValueChange={(value: string) => jobHandleEvent(value)}
              useNativeAndroidPickerStyle={false}
              items={[
                { label: '학생', value: '학생'},
                { label: '직장인', value: '직장인'},
                { label: '자영업자', value: '자영업자'},
                { label: '프리랜서', value: '프리랜서'},
                { label: '주부', value: '주부'},
                { label: '기타', value: '기타'},
              ]}
              style={pickerSelectStyles}
            />
          </StyledView>
          {jobSetting? <StyledTextInput 
                placeholder={"20자 이내로 작성해주세요"} 
                value={detailJob}
                style={{marginHorizontal: '6.8%', marginTop:10,paddingLeft: 5}}
                placeholderTextColor ="lightgrey"
                onChangeText={(text: string) => setDetailJob(text)}
                autoCorrect={false} maxLength={20} autoCapitalize={"none"} /> : null
          }
          <HorizontalLine style={{marginBottom:20}}/>
          <StyledText>생년월일<MiniText>&nbsp;&nbsp;(선택)</MiniText></StyledText>

        <DatePickerModal 
            setBirth={setFormData}
        />
        <HorizontalLine/>
    </>)
}
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      marginHorizontal: "6.8%",
      marginVertical:5,
    },
    inputAndroid: {
      marginHorizontal: 20,
      marginVertical: 3,
      height: 45,
      // borderWidth:1,
      paddingLeft: 10,
      borderColor: "lightgrey",
    },
  });