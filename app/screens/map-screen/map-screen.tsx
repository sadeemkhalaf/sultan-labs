import React from "react"
import { View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Header, Screen, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import MapsView from "../map"
import { useNavigation } from "@react-navigation/native"
import { CloseButton } from "../auth/shared-components"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}

export const MapScreen = observer(function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View testID="HomeScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.background}>
        <CloseButton text={'mainStack'} screen={'home'}/>
        <Header onLeftPress={() => navigation.goBack()} leftIcon={'back'} headerText='Where do you want to go?' />
        <MapsView />
      </Screen>
      {/* <Footer /> */}
    </View>
  )
})
