/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from "@react-navigation/native";
import { t } from "i18n-js";
import React, { useState } from "react"
import { View, ViewStyle } from "react-native"
import { Header, Screen, Text } from "../../../components"
import { color } from "../../../theme"
import { fontStyles } from "../../../theme/fonts";
import { scaleByDeviceWidth } from "../../../theme/scalingUtil";
import { LoginScreen } from "../login";
import { SignUpScreen } from "../signup";



const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.white,
  paddingHorizontal: scaleByDeviceWidth(24),
}
export const ROW: ViewStyle = {
  flexDirection: 'row',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
}

const SELECTED: ViewStyle = {
  borderBottomColor: color.palette.primaryRed,
  borderBottomWidth: scaleByDeviceWidth(1),
}

type StatePage = 'login' | 'signup';
const renderCopyrights = () => {
  return (
    <View style={{ backgroundColor: color.palette.white, paddingBottom: scaleByDeviceWidth(48) }}>
      <Text textColor={color.palette.lightBlue} style={[fontStyles.caption2Light, { textAlign: 'center' }]} >{'© Sultan Groups - All Rights reserved 2021-2022'}</Text>
    </View>
  );
}

export const AuthOptionsScreen = () => {

  const [selectedState, setState] = useState<StatePage>('login');
  const navigation = useNavigation();

  return (
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.background} statusBarColor={'white'}>
        <Header
        headerText={'Sultan Medical Labs'}
          onLeftPress={() => navigation.navigate("mainStack", { screen: "map" })}
        />
        <View style={ROW}>
          <View style={[selectedState === 'login' && SELECTED, { marginLeft: scaleByDeviceWidth(16) }]}>
            <Text style={fontStyles.bodyBold} textColor={selectedState === 'login' ? color.palette.primaryRed : color.palette.lightGrey} onPress={() => setState('login')}>{t('auth.login')}</Text>
          </View>
          <View style={[selectedState === 'signup' && SELECTED, { marginLeft: scaleByDeviceWidth(32) }]}>
            <Text style={fontStyles.bodyBold} onPress={() => setState('signup')} textColor={selectedState === 'signup' ? color.palette.primaryRed : color.palette.lightGrey}>{t('auth.signup')}</Text>
          </View>
        </View>
        {selectedState === 'login' &&
          <LoginScreen />
        }
        {selectedState === 'signup' &&
          <SignUpScreen />
        }

      {renderCopyrights()}
      </Screen>

  )
}
