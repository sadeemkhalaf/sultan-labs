import React from "react"
import { View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Wallpaper, Screen, Header } from "../../../components"
import { Footer } from "../../../components/footer/footer"
import { color, spacing } from "../../../theme"
import MapsView from "../../map"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}

export const ConfirmAccountScreen = observer(function ConfirmAccountScreen() {

  return (
    <View testID="ConfirmAccountScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.background}>
        <Header headerText='Confirm Account'/>
        <MapsView />
      </Screen>
      <Footer />
    </View>
  )
})
