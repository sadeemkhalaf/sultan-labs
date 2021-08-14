import React, { useRef, useState } from "react"
import { View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Wallpaper, Screen, Header, Text } from "../../../components"
import { Footer } from "../../../components/footer/footer"
import { color, spacing } from "../../../theme"
import { CloseButton, EmailInputField, PasswordInputField, TextInputField } from "../shared-components"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
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
    <View testID="CreateAccount" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.background}>
        <CloseButton text={'authOptions'} />
        <Header headerText='Create Account' />
        <View style={styles.inputWrapper}>
          {EmailInputField(email, setEmail, emailRef)}
          {TextInputField(mobile, setMobile, 'Mobile', mobRef)}
          {PasswordInputField(password, setPassword, passwrordRef)}
          <Text style={{ color: color.palette.secondary }} text={'Already have an account'} onPress={() => navigate.navigate('login')} />
        </View>
      </Screen>
      <Footer text={'auth.login'} />
    </View>
  )
})
