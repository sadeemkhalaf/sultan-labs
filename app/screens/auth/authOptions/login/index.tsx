/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from "react"
import { View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Text } from "../../../../components"
import { color } from "../../../../theme"
import { EmailInputField, PasswordInputField } from "../../shared-components"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native"
import { fontStyles } from "../../../../theme/fonts"
import { scaleByDeviceWidth, width } from "../../../../theme/scalingUtil"
import { t } from "i18n-js"
import { ROW } from "../.."
import { Facebook, Google } from "../../../../../assets/images/svg"
import { useKeyboard } from "../../../../utils/hooks/useKeyboard"
import { signinWithGoogleAccount } from "../../../../utils/auth/auth-api"
import { useDispatch } from "react-redux"

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

export const LoginScreen = observer(function LoginScreen() {
  const navigate = useNavigation();
  const dispatch = useDispatch(); // will be used later to dispatch setToken action

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef(null);
  const passwrordRef = useRef(null);
  const [keyboardOpen] = useKeyboard();

  const renderSocialButton = (socialMediaType: 'facebook' | 'google', handleOnPress) => {

    const Icon = (icon) => {
      switch (icon) {
        case 'facebook':
          return <Facebook height={24} width={24} />
        case 'google':
          return <Google height={24} width={24} />
      }
    }

    return (
      <Button onPress={handleOnPress} style={SOCIALBUTTON} text={t('auth.login')}>{Icon(socialMediaType)}</Button>
    )
  }

  const handleGoogleSignin = async () => await signinWithGoogleAccount()

  return (
    <View testID="LoginScreen" style={FULL}>
      <Text style={[fontStyles.largeTitleBold, { marginBottom: scaleByDeviceWidth(32) }]} textColor={color.palette.black}>{'Welcome Back!'}</Text>
      <View style={styles.inputWrapper}>
        {EmailInputField(email, setEmail, emailRef)}
        {PasswordInputField(password, setPassword, passwrordRef)}
      </View>
      <Button onPress={() => navigate.navigate('mainStack', { screen: 'home' })} text={t('auth.login')} textStyle={fontStyles.bodyRegular}></Button>

        {!keyboardOpen && <>
          <Text textColor={color.palette.black} style={[fontStyles.caption1Regular, { textAlign: 'center', marginVertical: scaleByDeviceWidth(32) }]}>{'Or, Login with'}</Text>
          <View style={[ROW, { width: '100%', justifyContent: 'space-between' }]}>
            {renderSocialButton('google', handleGoogleSignin)}
            {renderSocialButton('facebook', () => true)}
          </View>
        </>}

    </View>
  )
})
