/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from "react"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Text } from "../../../../components"
import { color } from "../../../../theme"
import { EmailInputField, PasswordInputField } from "../../shared-components"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native"
import { fontStyles } from "../../../../theme/fonts"
import { scaleByDeviceWidth, width } from "../../../../theme/scalingUtil"
import { t } from "i18n-js"
import { ROW } from "../.."
import { Apple, Facebook, Google, Twitter } from "../../../../../assets/images/svg"
import { useKeyboard } from "../../../../utils/hooks/useKeyboard"
import {
  checkUserExists,
  signinWithEmailPassword,
  signinWithGoogleAccount,
} from "../../../../utils/auth/auth-api"
import { useDispatch } from "react-redux"
import { loginUser, setToken } from "../../../../store/Action"

const FULL: ViewStyle = {
  marginVertical: scaleByDeviceWidth(32),
  paddingRight: scaleByDeviceWidth(24),
  width: width - 48,
  flex: 1,
}

const SOCIALBUTTON: ViewStyle = {
  borderColor: color.palette.lighterGrey,
  borderWidth: 1,
  backgroundColor: "transparent",
  width: scaleByDeviceWidth(width / 2 - 56),
  marginVertical: scaleByDeviceWidth(8)
}

export type IcontType = "facebook" | "google" | "twitter" | "apple";

export const renderSocialButton = (socialMediaType: IcontType, handleOnPress) => {
  const Icon = (icon) => {
    switch (icon) {
      case "facebook":
        return <Facebook height={24} width={24} />
      case "google":
        return <Google height={24} width={24} />
      case "apple":
        return <Apple height={24} width={24} />
      case "twitter":
        return <Twitter height={24} width={24} />
    }
  }

  return (
    <Button onPress={handleOnPress} style={SOCIALBUTTON} text={t("auth.login")}>
      {Icon(socialMediaType)}
    </Button>
  )
}

export const LoginScreen = observer(function LoginScreen() {
  const navigate = useNavigation()
  const dispatch = useDispatch() // will be used later to dispatch setToken action

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState('');
  const emailRef = useRef(null)
  const passwrordRef = useRef(null)
  const [keyboardOpen] = useKeyboard()

  const _persistToStoreOnSuccess = ({ user }) => {
    console.log(user.uid);

    dispatch(setToken(user?._user?.refreshToken))
    dispatch(
      loginUser({
        user: user,
        uid: user?.uid,
        userType: "user",
        loggedIn: true,
      }),
    )
  }
  const handleGoogleSignin = async () => await signinWithGoogleAccount()

  const renderSocialLogin = () => {
    const SOCIALROW: ViewStyle = {
      width: "100%",
      justifyContent: "space-between",
      flexWrap: 'wrap'
    }
    return (
      <>
        <View style={[ROW, SOCIALROW]}>
          {renderSocialButton("google", handleGoogleSignin)}
          {renderSocialButton("facebook", handleGoogleSignin)}
          {renderSocialButton("twitter", handleGoogleSignin)}
          {renderSocialButton("apple", handleGoogleSignin)}
        </View>
      </>
    )
  }

  const TITLE: TextStyle = {
    textAlign: "center",
    marginVertical: scaleByDeviceWidth(16),
  }

  const handleLogin = async () => {
    const exists = await checkUserExists(email)
    if (exists && exists.length > 0 && exists.find((method) => method === "password")) {
      signinWithEmailPassword(email, password)
        .then((userInfo) => {
          _persistToStoreOnSuccess(userInfo);
          setError('');
          setEmail('');
          setPassword('');
          navigate.navigate("mainStack", { screen: "home" })
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            console.log("That email address is already in use!")
            setError("That email address is already in use!");
          }
          if (error.code === "auth/invalid-email") {
            console.log("That email address is invalid!")
            setError("That email address is invalid!");
          } else {
            console.log("error: ", error)
            setError("Wrong email or password!");
            // some other error happened
          }
        })
    } else {
      setError("User email doesn't exist");
    }
  }

  return (
    <ScrollView testID="LoginScreen" style={FULL}>
      <Text
        style={[fontStyles.largeTitleBold, { marginBottom: scaleByDeviceWidth(32) }]}
        textColor={color.palette.black}
      >
        {"Welcome Back!"}
      </Text>

      <View style={styles.inputWrapper}>
        {EmailInputField(email, setEmail, emailRef, 'Email or Mobile Number')}
        {PasswordInputField(password, setPassword, passwrordRef)}
        {error.length > 0 && <Text textColor={color.palette.orange} style={fontStyles.caption4Regular}>
          {error}
        </Text>}
        {!keyboardOpen && <Text
          style={[fontStyles.caption2Medium, { marginTop: scaleByDeviceWidth(8) }]}
          textColor={color.palette.red.level1}
          onPress={() => true}
        >
          {t("auth.forgotPassword")}
        </Text>}
      </View>
      {!keyboardOpen && <>
        <Text textColor={color.palette.black} style={[fontStyles.caption1Regular, TITLE]}>
          {"Or, Login with"}
        </Text>
        {renderSocialLogin()}
      </>}
      <Button
        style={[{ marginVertical: scaleByDeviceWidth(16) }, (email.length < 1 || password.length < 1) && { backgroundColor: color.palette.red.level3 }]}
        disabled={email.length < 1 || password.length < 1}
        onPress={handleLogin}
        text={t("auth.login")}
        textStyle={fontStyles.bodyRegular}
      ></Button>
    </ScrollView>
  )
})
