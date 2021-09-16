import { useNavigation } from "@react-navigation/native"
import React from "react"
import { ViewStyle, TextStyle, SafeAreaView, View } from "react-native"
import { Button } from ".."
import { spacing, color, typography } from "../../theme"
import { moderateScale } from "../../theme/scalingUtil"

const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.orange,
  marginBottom: moderateScale(8)
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

const FOOTER: ViewStyle = { backgroundColor: color.palette.white }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

export const footerNavButton = (text = '', screen, buttonStyle?: ViewStyle, action = () => {}) => {
  const navigation = useNavigation()
  const nextScreen = () => {
    navigation.navigate('authStack',{screen: screen});
    action();
  }
  return (<Button
    testID="next-screen-button"
    style={[CONTINUE, {...buttonStyle}]}
    textStyle={CONTINUE_TEXT}
    tx={text || "welcomeScreen.continue"}
    onPress={nextScreen}
  />)
}

export const Footer = (props) => {
  const navigation = useNavigation()
  const nextScreen = () => navigation.navigate('mainStack', {screen: "home"})
  return (
    <SafeAreaView style={[FOOTER, {backgroundColor:"white"}]}>
      <View style={FOOTER_CONTENT}>
        <Button
          testID="next-screen-button"
          style={CONTINUE}
          textStyle={CONTINUE_TEXT}
          tx={props.text ? props.text : "welcomeScreen.continue"}
          onPress={nextScreen}
        />
      </View>
    </SafeAreaView>
  )
}
