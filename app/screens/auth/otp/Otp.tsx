import React, { useEffect, useState } from "react"
import { View, ViewStyle, StyleSheet, TextStyle } from "react-native"
import { t } from "i18n-js"
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { StackActions, useNavigation } from "@react-navigation/native"
import { Screen, Header, Text, Button } from "../../../components"
import { color, spacing } from "../../../theme"
import { fontStyles } from "../../../theme/fonts"
import { scaleByDeviceWidth } from "../../../theme/scalingUtil"
import { useKeyboard } from "../../../utils/hooks/useKeyboard"
import { auth } from "../../../../fb-configs"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../../../store/Action"
import { AccountReducer } from "../../../store/Action/types"
import { RootState } from "../../../store/Reducer"
import { PhoneOtp } from "../../../../assets/images/svg"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}


//  observer(function OtpScreen({ route, navigation }) observer(function OtpScreen()

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


export const OtpScreen = ({ route, navigation }) => {

  const { mobile } = route.params;

  const [confirm, setConfirm] = useState<any>(null);
  const [codeError, setCodeError] = useState(false);
  const [codeStatus, setCodeStatus] = useState<boolean | null>(null);
  const [code, setCode] = useState('');

  const [keyboardOpen] = useKeyboard();
  const navigate = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (mobile) {
      signInWithPhoneNumber(mobile)
    }
  }, [])


  const signInWithPhoneNumber = async (phoneNumber: string) => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log('confirmation: ', confirmation);
    
    setConfirm(confirmation);
  };

  const accountStore = useSelector<RootState>(
    (state) => state.Account,
  ) as AccountReducer;

  const confirmCode = async () => {
    try {
      const conf = await confirm.confirm(code);
      dispatch(updateUser({...accountStore, ...conf}));
      setCodeStatus(true);
      navigate.dispatch(StackActions.replace('authStack', { screen: 'createPassword' }));
      setCodeError(false);
    } catch (error) {
      setCodeStatus(false);
      setCodeError(true);
    }
  };

  return (
    <View testID="OtpScreen" style={FULL}>
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.background}>
        <Header leftIcon={'back'} onLeftPress={() => navigate.goBack()} />
        <Text style={fontStyles.largeTitleBold} textColor={color.palette.black}>{'Confirm Account'}</Text>
        <Text style={[fontStyles.subHeadRegular, { marginBottom: scaleByDeviceWidth(32) }]} textColor={color.palette.dustyBlue}>{'Verify your phone number'}</Text>
        {!keyboardOpen && <View style={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        <PhoneOtp height={scaleByDeviceWidth(165)} width={scaleByDeviceWidth(165)} />
        </View>}
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
            onCodeFilled={(() => {
              confirmCode()
            })}
            keyboardAppearance={'default'}
          />
          
        </View>
        <Text style={[fontStyles.caption1Medium, RESEND]} textColor={color.palette.dustyBlue}>{t('auth.resend')}</Text>
        <Button onPress={confirmCode} text={t('common.next')} textStyle={fontStyles.bodyRegular} style={{ marginBottom: scaleByDeviceWidth(keyboardOpen ? 16 : 56) }}></Button>

      </Screen>
    </View>

  )
};

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