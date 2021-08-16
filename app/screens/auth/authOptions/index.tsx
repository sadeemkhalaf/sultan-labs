import React from "react"
import { View, ViewStyle } from "react-native"

import { Screen } from "../../../components"
import { footerNavButton } from "../../../components/footer/footer";

import { color, spacing } from "../../../theme"
import { styles } from './styles';



const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}

const BUTTON_STYLE: ViewStyle = {
  backgroundColor: color.palette.secondary,
}

const LIGHT_BUTTON_STYLE: ViewStyle = {
  backgroundColor: color.palette.lightGrey,
}


export const AuthOptionsScreen = () => {

  return (
    <View testID="AuthOptionsScreen" style={FULL}>
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.background}>
        <View style={styles.inputWrapper}>
          {footerNavButton('auth.appleSignUp', 'login', BUTTON_STYLE)}
          {footerNavButton('auth.googleSignUp', 'login', BUTTON_STYLE)}
          {footerNavButton('auth.loginWithEmail', 'login', LIGHT_BUTTON_STYLE)}
        </View>
      </Screen>
    </View>
  )
}
