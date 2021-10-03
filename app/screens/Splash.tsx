import React, { useEffect, useRef } from "react"
import { Animated, ViewStyle } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { useSelector } from "react-redux"
import styled from "styled-components/native"
import { ConfigsReducer } from "../store/Action/types"
import { color } from "../theme"
import { RootState } from "../store/Reducer"
import { scaleByDeviceWidth } from "../theme/scalingUtil"
import { StackActions, useNavigation } from "@react-navigation/native"
import { Logo } from "../../assets/images/svg"
import { Screen } from "../components"

const Splash = () => {
  const { dispatch } = useNavigation()

  const { loggedIn, token } = useSelector<RootState>(
    (state) => state.Configs,
  ) as ConfigsReducer

  const LogoFadeIn = useRef(new Animated.Value(0)).current

  const AnimatedViewStyle: ViewStyle = {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
  }


  useEffect(() => {
    const randomDuration = Math.floor(Math.random() * 2) + 1;
    Animated.timing(LogoFadeIn, {
      toValue: 1,
      duration: loggedIn ? randomDuration + 1 : randomDuration,
      useNativeDriver: true,
    }).start()

    const timeout = setTimeout(
      () =>
        loggedIn && token
          ? dispatch(StackActions.replace("mainStack", { screen: "home" }))
          : dispatch(StackActions.replace("authStack", { screen: "authOptions" })),
      2000,
    )
    return () => clearTimeout(timeout)
  }, [])


  return (
    <Screen preset={'fixed'} unsafe statusBarColor={color.palette.red.level1} statusBar={'light-content'}>
      <LinearGradient colors={[color.palette.red.level1, color.palette.red.level3]} angle={45}>
        <StyledView>
          <Animated.View style={[AnimatedViewStyle, { opacity: LogoFadeIn }]}>
            <Logo height={scaleByDeviceWidth(175)} width={scaleByDeviceWidth(175)} />
          </Animated.View>
        </StyledView>
      </LinearGradient>
    </Screen>
  )
}

export default Splash

const StyledView = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
