import React, { useRef, useState } from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Wallpaper, Screen, Header, Text } from "../../../components"
import { Footer } from "../../../components/footer/footer"
import { color, spacing, typography } from "../../../theme"
import { EmailInputField, PasswordInputField, TextInputField } from "../shared-components"
import { styles } from "./styles"
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



export const SignUpScreen = observer(function WelcomeScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const navigate = useNavigation();
  const emailRef = useRef(null);
  const passwrordRef = useRef(null);
  const mobRef = useRef(null);
  
  return (
    <View testID="WelcomeScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.background}>
        <Header headerText='Where do you want to go?' />
        <View style={styles.inputWrapper}>
          {EmailInputField(email, setEmail, emailRef)}
          {TextInputField(mobile, setMobile, 'Mobile' ,mobRef)}
          {PasswordInputField(password, setPassword, passwrordRef)}
          <Text style={{ color: color.palette.deepPurple }} text={'Already have an account'} onPress={() => navigate.navigate('login')} />
        </View>
      </Screen>
      <Footer text={'auth.login'}/>
    </View>
  )
})
