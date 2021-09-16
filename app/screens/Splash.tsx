import React, { useEffect, useRef } from "react"
import { Animated, ViewStyle } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { useSelector } from "react-redux"
import styled from "styled-components/native"
import { AccountReducer, ConfigsReducer } from "../store/Action/types"
import { Text } from "../components"
import { t } from "i18n-js"
import { color } from "../theme"
import { RootState } from "../store/Reducer"
import { scaleByDeviceWidth } from "../theme/scalingUtil"
import { StackActions, useNavigation } from "@react-navigation/native"
import { Logo } from "../../assets/images/svg"

const Splash = () => {
  const { dispatch } = useNavigation()

  const { loggedIn, isVerified, token } = useSelector<RootState>(
    (state) => state.Configs,
  ) as ConfigsReducer

  const { user } = useSelector<RootState>((state) => state.Account) as AccountReducer

  const LogoFadeIn = useRef(new Animated.Value(0)).current
  const ButtonsFadeIn = useRef(new Animated.Value(0)).current

  const AnimatedViewStyle: ViewStyle = {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
  }
  const AnimatedOptionsStyle: ViewStyle = {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  }

  useEffect(() => {
    Animated.timing(LogoFadeIn, {
      toValue: 1,
      duration: loggedIn ? 2000 : 1000,
      useNativeDriver: true,
    }).start()

    const timeout = setTimeout(
      () =>
        loggedIn && token
          ? dispatch(StackActions.replace("mainStack", { screen: "home" }))
          : Animated.timing(ButtonsFadeIn, {
              toValue: 1,
              duration: 1500,
              useNativeDriver: true,
            }).start(),
      2000,
    )

    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <LinearGradient colors={[color.palette.primaryRed, color.palette.lightRed]} angle={45}>
        <StyledView>
          <Animated.View style={[AnimatedViewStyle, { opacity: LogoFadeIn }]}>
            <Logo height={scaleByDeviceWidth(165)} width={scaleByDeviceWidth(165)} />
          </Animated.View>

          <Animated.View
            style={[
              AnimatedOptionsStyle,
              {
                opacity: ButtonsFadeIn,
              },
            ]}
          >
            <SkipButton
              css={{ borderBottomColor: color.palette.white, borderBottomWidth: 1 }}
              onPress={() => dispatch(StackActions.replace("authStack", { screen: "authOptions" }))}
            >
              <Text style={{ fontSize: scaleByDeviceWidth(18) }} textColor={color.palette.white}>
                {t("common.start")}
              </Text>
            </SkipButton>
          </Animated.View>
        </StyledView>
      </LinearGradient>
    </>
  )
}

export default Splash

const StyledView = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const SkipButton = styled.TouchableOpacity`
  margin: 5px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
