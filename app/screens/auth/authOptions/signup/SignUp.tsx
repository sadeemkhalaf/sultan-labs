import React, { useRef, useState } from "react"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Text } from "../../../../components"
import { color } from "../../../../theme"
import { EmailInputField, TextInputField, } from "../../shared-components"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native"
import { fontStyles } from "../../../../theme/fonts"
import { scaleByDeviceWidth, width } from "../../../../theme/scalingUtil"
import { t } from "i18n-js"
import { Apple, Facebook, Google, Twitter } from "../../../../../assets/images/svg"
import { useKeyboard } from "../../../../utils/hooks/useKeyboard"
import { AccountReducer } from "../../../../store/Action/types"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../../store/Reducer"
import { tempUser, updateUser } from "../../../../store/Action"
import { IcontType } from "../login/Login"

const FULL: ViewStyle = {
  marginVertical: scaleByDeviceWidth(32),
  paddingLeft: scaleByDeviceWidth(24),
  width: width - 48,
  flex: 1,
}

const ROW: ViewStyle = {
  flexDirection: "row",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  width: '100%',
}

const SOCIALBUTTON: ViewStyle = {
  borderColor: color.palette.lighterGrey,
  borderWidth: 1,
  backgroundColor: 'transparent',
  width: scaleByDeviceWidth((width / 2) - 56),
  marginBottom: scaleByDeviceWidth(8)
}

export const SignUpScreen = observer(function SignUpScreen() {
  const navigate = useNavigation();
  const [name, setName] = useState("Mohammad Ali");
  const [email, setEmail] = useState("test2@test.com");
  const [mobile, setMobile] = useState("+962792077863");
  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const mobileRef = useRef(null);
  const [keyboardOpen] = useKeyboard();
  const dispatch = useDispatch();

  // test 
  const accountStore = useSelector<RootState>(
    (state) => state.Account,
  ) as AccountReducer;

  const renderSocialButton = (socialMediaType: IcontType) => {
    const Icon = (icon) => {
      switch (icon) {
        case 'facebook':
          return <Facebook height={24} width={24} />
        case 'google':
          return <Google height={24} width={24} />
        case 'apple':
          return <Apple height={24} width={24} />
        case 'twitter':
          return <Twitter height={24} width={24} />
      }
    }


    return (
      <Button style={SOCIALBUTTON} text={t('auth.login')}>{Icon(socialMediaType)}</Button>
    )
  }

  const renderSocialSignup = () => {
    const SOCIALROW: ViewStyle = {
      flexWrap: 'wrap',
      width: '100%',
      justifyContent: 'space-between'
    }
    const TITLE: TextStyle = {
      textAlign: 'center',
      marginVertical: scaleByDeviceWidth(32)
    }
    return (<>
      <Text textColor={color.palette.black}
        style={[fontStyles.caption1Regular, TITLE]}>
        {'Or, Sign up with'}
      </Text>
      <View style={[ROW, SOCIALROW]}>
        {renderSocialButton('google')}
        {renderSocialButton('facebook')}
        {renderSocialButton('twitter')}
        {renderSocialButton('apple')}
      </View>
    </>)
  }
  const handleSignUp = () => {
    dispatch(tempUser({ email: email, mobileNumber: mobile, fullName: name }));
    navigate.navigate('authStack', { screen: 'otp', params: { mobile: mobile } })
  }

  return (
    <ScrollView testID="SignUpScreen" style={FULL} showsVerticalScrollIndicator={false}>
      <Text style={[fontStyles.largeTitleBold, { marginBottom: scaleByDeviceWidth(32) }]} textColor={color.palette.black}>{'Create an Account'}</Text>
      <View style={styles.inputWrapper}>
        {TextInputField(name, setName, 'Full Name', nameRef, () => true)}
        {EmailInputField(email, setEmail, emailRef, 'Email or Number')}
        {TextInputField(mobile, setMobile, 'Mobile Number', mobileRef, () => true)}
      </View>
      <Button onPress={handleSignUp} text={t('auth.signup')} textStyle={fontStyles.bodyRegular} disabled={mobile.length < 1 || email.length < 1}></Button>

      {!keyboardOpen && <>
        {renderSocialSignup()}
      </>}
    </ScrollView>
  )
})
