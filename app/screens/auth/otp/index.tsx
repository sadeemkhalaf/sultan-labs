import React, { useState } from "react"
import { View, ViewStyle, StyleSheet, TextStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { t } from "i18n-js"
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { Screen, Header, Text, Button } from "../../../components"
import { color, spacing } from "../../../theme"
import { fontStyles } from "../../../theme/fonts"
import { scaleByDeviceWidth } from "../../../theme/scalingUtil"
import { useKeyboard } from "../../../utils/hooks/useKeyboard"
import { useNavigation } from "@react-navigation/native"



const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}

export const OtpScreen = observer(function OtpScreen() {

  const [keyboardOpen] = useKeyboard();
  const navigate = useNavigation();
  const [code, setCode] = useState('');


  const OTPVIEW: ViewStyle = {
    width: '100%',
    height: scaleByDeviceWidth(40),
    paddingHorizontal: scaleByDeviceWidth(12)
  }
  const OTPCONTAINER: ViewStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  }

  const RESEND: TextStyle = {
    width: '100%',
    textAlign: 'center',
    paddingHorizontal: scaleByDeviceWidth(8),
    marginBottom: scaleByDeviceWidth(24)
  }

  return (
    <View testID="OtpScreen" style={FULL}>
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.background}>
        <Header leftIcon={'back'} onLeftPress={() => navigate.goBack()} />
        <Text style={fontStyles.largeTitleBold} textColor={color.palette.black}>{'Confirm Account'}</Text>
        <Text style={[fontStyles.subHeadRegular, { marginBottom: scaleByDeviceWidth(32) }]} textColor={color.palette.dustyBlue}>{'Verify your phone number'}</Text>
        <View style={OTPCONTAINER}>
          <Text style={[fontStyles.caption2Regular, { paddingHorizontal: scaleByDeviceWidth(8), marginBottom: scaleByDeviceWidth(32) }]} textColor={color.palette.dustyBlue}>{t('auth.verifyotp')}</Text>
          <OTPInputView
            style={OTPVIEW}
            pinCount={6}
            code={code}
            onCodeChanged={setCode}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={(code => {
              console.log(`Code is ${code}, you are good to go!`)
            })}
          />
        </View>
        <Text style={[fontStyles.caption1Medium, RESEND]} textColor={color.palette.dustyBlue}>{t('auth.resend')}</Text>
        <Button onPress={() => navigate.navigate('authStack', { screen: 'createPassword' })} text={t('common.next')} textStyle={fontStyles.bodyRegular} style={{ marginBottom: scaleByDeviceWidth(keyboardOpen ? 16 : 56) }}></Button>

      </Screen>
    </View>

  )
})

const styles = StyleSheet.create({
  underlineStyleBase: {
    backgroundColor: color.palette.fieldGrey,
    borderRadius: scaleByDeviceWidth(10),
    borderWidth: 0,
    color: color.palette.darkBlue,
    height: scaleByDeviceWidth(42),
    width: scaleByDeviceWidth(42),
  },

  underlineStyleHighLighted: {
    borderColor: color.palette.lighterBlue,
    borderWidth: scaleByDeviceWidth(1),
  },
});