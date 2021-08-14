import React from "react"
import { View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Header, Screen, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import { foorterNavButton } from "../../components/footer/footer"
import { useNavigation } from "@react-navigation/native"
import { styles } from "../auth/login/styles"

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

export const HomeScreen = observer(function HomeScreen() {

  return (
    <View testID="HomeScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.background}>
        <Header headerText='What do you want to do?' />
        <View style={styles.inputWrapper}>
          {foorterNavButton('common.lab', 'labDetails', LIGHT_BUTTON_STYLE)}
          {foorterNavButton('common.viewMap', 'map', LIGHT_BUTTON_STYLE)}
        </View>

        {foorterNavButton('auth.logout', 'login', BUTTON_STYLE)}
      </Screen>
    </View>
  )
})
