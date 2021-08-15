import React, { useRef, useState } from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Header, Text } from "../../../components"
import { Footer } from "../../../components/footer/footer"
import { color, spacing, typography } from "../../../theme"
import { CloseButton, EmailInputField, PasswordInputField } from "../shared-components";
import { styles } from './styles';
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



export const LoginScreen = observer(function LoginScreen() {

  const navigate = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef(null);
  const passwrordRef = useRef(null);

  return (
    <View testID="LoginScreen" style={FULL}>
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.background}>

        <CloseButton text={'authOptions'} />
        <Header style={HEADER} headerText={'Login'} headerTx={'auth.login'} titleStyle={HEADER_TITLE} />
        <View style={styles.inputWrapper}>
          {EmailInputField(email, setEmail, emailRef)}
          {PasswordInputField(password, setPassword, passwrordRef)}
          <Text style={{ color: color.palette.secondary }} text={'Create Account'} onPress={() => navigate.navigate('authStack' , {screen: 'signup'})} />
        </View>
      </Screen>
      <Footer text={'auth.login'} />
    </View>
  )
})
