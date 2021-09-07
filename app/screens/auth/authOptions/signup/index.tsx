import React, { useRef, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Text } from "../../../../components"
import { color } from "../../../../theme"
import { EmailInputField, TextInputField, } from "../../shared-components"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native"
import { fontStyles } from "../../../../theme/fonts"
import { scaleByDeviceWidth, width } from "../../../../theme/scalingUtil"
import { t } from "i18n-js"
import { Facebook, Google } from "../../../../../assets/images/svg"
import { useKeyboard } from "../../../../utils/hooks/useKeyboard"
import { ROW } from "../../authOptions"

const FULL: ViewStyle = {
  marginVertical: scaleByDeviceWidth(32),
  flex: 1,
}

const SOCIALBUTTON: ViewStyle = {
  borderColor: color.palette.lighterGrey,
  borderWidth: 1,
  backgroundColor: 'transparent',
  width: scaleByDeviceWidth((width / 2) - 48),
}

export const SignUpScreen = observer(function SignUpScreen() {
  const navigate = useNavigation();
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const [keyboardOpen] = useKeyboard();

  const renderSocialButton = (socialMediaType: 'facebook' | 'google') => {

    const Icon = (icon) => {
      switch (icon) {
        case 'facebook':
          return <Facebook height={24} width={24} />
        case 'google':
          return <Google height={24} width={24} />
      }
    }

    return (
      <Button style={SOCIALBUTTON} text={t('auth.login')}>{Icon(socialMediaType)}</Button>
    )
  }

  const renderSocialSignup = () => {
    const SOCIALROW: ViewStyle = {
      width: '100%', justifyContent:
        'space-between'
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
      </View>
    </>)
  }

  return (
    <View testID="SignUpScreen" style={FULL}>
      <Text style={[fontStyles.largeTitleBold, { marginBottom: scaleByDeviceWidth(32) }]} textColor={color.palette.black}>{'Create an Account'}</Text>
      <View style={styles.inputWrapper}>
        {EmailInputField(email, setEmail, emailRef)}
        {TextInputField(mobile, setMobile, 'Mobile Number', mobileRef)}
      </View>
      <Button onPress={() => navigate.navigate('authStack', { screen: 'otp' })} text={t('auth.signup')} textStyle={fontStyles.bodyRegular}></Button>
      
      {!keyboardOpen && <>
        {renderSocialSignup()}
      </>}
    </View>
  )
})
