import { useNavigation } from "@react-navigation/native"
import React from "react"
import { ViewStyle, TextStyle, SafeAreaView, View } from "react-native"
import { Button } from ".."
import { spacing, color, typography } from "../../theme"

const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.blue,
}

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }

const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: color.palette.offWhite }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}
export const Footer = () => {
  const navigation = useNavigation()
  const nextScreen = () => navigation.navigate("demo")
  return (
    <SafeAreaView style={FOOTER}>
      <View style={FOOTER_CONTENT}>
        <Button
          testID="next-screen-button"
          style={CONTINUE}
          textStyle={CONTINUE_TEXT}
          tx="welcomeScreen.continue"
          onPress={nextScreen}
        />
      </View>
    </SafeAreaView>
  )
}
