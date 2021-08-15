import React from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Card, Header, Screen, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
import MapsView from "../map"
import { Footer } from "../../components/footer/footer"
import { useNavigation } from "@react-navigation/native"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
  color: color.primary
}



export const TestDetailsScreen = observer(function TestDetailsScreen() {
  const navigation = useNavigation();
  return (
    <View testID="TestDetailsScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.background}>
        <Header onLeftPress={() => navigation.goBack()} leftIcon={'back'} headerText='Blood Type Test'/>
        {Card('Book a test now!', '')}
      </Screen>
      <Footer />
    </View>
  )
})
