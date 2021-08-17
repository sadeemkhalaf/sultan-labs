import React from "react"
import { View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Card, Header, Screen } from "../../components"
import { color, spacing } from "../../theme"
import { Footer } from "../../components/footer/footer"
import { useNavigation } from "@react-navigation/native"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}

export const TestDetailsScreen = observer(function TestDetailsScreen() {
  const navigation = useNavigation();
  return (
    <View testID="TestDetailsScreen" style={FULL}>
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.background}>
        <Header onLeftPress={() => navigation.goBack()} leftIcon={'back'} headerText='Blood Type Test'/>
        {Card('Book a test now!', '')}
      </Screen>
      <Footer />
    </View>
  )
})
