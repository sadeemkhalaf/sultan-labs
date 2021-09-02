import React from "react"
import { View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Wallpaper, Screen, Header } from "../../../components"
import { Footer } from "../../../components/footer/footer"
import { color, spacing, typography } from "../../../theme"


const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}

export const OtpScreen = observer(function OtpScreen() {

  return (
    <View testID="OtpScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.background}>
        <Header headerText='OTP'/>
      </Screen>
      <Footer />
    </View>
  )
})
