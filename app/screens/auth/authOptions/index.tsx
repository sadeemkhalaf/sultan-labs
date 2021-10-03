/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from "@react-navigation/native"
import { t } from "i18n-js"
import React, { useCallback, useRef, useState } from "react"
import { View, ViewStyle, FlatList } from "react-native"
import { Header, Screen, Text } from "../../../components"
import { color } from "../../../theme"
import { fontStyles } from "../../../theme/fonts"
import { scaleByDeviceWidth, width } from "../../../theme/scalingUtil"
import { SignUpScreen } from ".."
import { LoginScreen } from "./login/Login"
import { useKeyboard } from "../../../utils/hooks/useKeyboard"

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.white,
}
export const ROW: ViewStyle = {
  flexDirection: "row",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  width: '100%',
}

const SELECTED: ViewStyle = {
  borderBottomColor: color.palette.primaryRed,
  borderBottomWidth: scaleByDeviceWidth(1),
}

type StatePage = "login" | "signup"
export const renderCopyrights = () => {
  return (
    <View style={{ backgroundColor: color.palette.white, paddingBottom: scaleByDeviceWidth(48), paddingTop: scaleByDeviceWidth(8) }}>
      <Text
        textColor={color.palette.lightBlue}
        style={[fontStyles.caption2Light, { textAlign: "center" }]}
      >
        {"©Sultan Groups - All Rights reserved 2021-2022"}
      </Text>
    </View>
  )
}

export const AuthOptionsScreen = () => {
  const [selectedState, setState] = useState<StatePage>("login")
  const [keyboardOpen] = useKeyboard();
  const navigation = useNavigation()
  const flatRef = useRef(null)

  const pages = [
    { type: "login", id: 1 },
    { type: "signup", id: 2 },
  ]

  const handleOnPageSelected = useCallback((itemIndex) => {
    flatRef?.current.scrollToOffset({ offset: scaleByDeviceWidth(itemIndex * width) })
  }, [])

  return (
    <>
      <Screen
        statusBarColor={"white"}
        statusBar={'dark-content'}
        preset="fixed"
        backgroundColor={color.background}
        style={{ width: '100%', flex: 1, paddingHorizontal: scaleByDeviceWidth(24) }}
      >
        <Header
          headerText={"Sultan Medical Labs"}
          onLeftPress={() => navigation.navigate("mainStack", { screen: "map" })}
        />
        <View style={ROW}>
          <View
            style={[selectedState === "login" && SELECTED, { marginLeft: scaleByDeviceWidth(16) }]}
          >
            <Text
              style={fontStyles.bodyBold}
              textColor={
                selectedState === "login" ? color.palette.primaryRed : color.palette.lightGrey
              }
              onPress={() => {
                setState("login")
                handleOnPageSelected(0)
              }}
            >
              {t("auth.login")}
            </Text>
          </View>
          <View
            style={[selectedState === "signup" && SELECTED, { marginLeft: scaleByDeviceWidth(32) }]}
          >
            <Text
              style={fontStyles.bodyBold}
              onPress={() => {
                setState("signup")
                handleOnPageSelected(1)
              }}
              textColor={
                selectedState === "signup" ? color.palette.primaryRed : color.palette.lightGrey
              }
            >
              {t("auth.signup")}
            </Text>
          </View>
        </View>
        <FlatList
          ref={flatRef}
          data={pages}
          renderItem={({ item, index }) => (
            <View key={index}>
              {item.type === "login" && (
                <View
                  style={{
                    width: width - 48,
                    alignItems: "center",
                    justifyContent: "flex-start",
                    marginHorizontal: scaleByDeviceWidth(8),
                    flex: 1,
                  }}
                >
                  <LoginScreen />
                </View>
              )}
              {item.type === "signup" && (
                <View
                  style={{
                    width: width - 48,
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flex: 1,
                    marginHorizontal: scaleByDeviceWidth(8),
                  }}
                >
                  <SignUpScreen />
                </View>
              )}
            </View>
          )}
          keyExtractor={(item, index) => item.id}
          pagingEnabled
          horizontal
          scrollEnabled={false}
          bounces={false}
          showsHorizontalScrollIndicator={false}
        />
      </Screen>
      {!keyboardOpen && renderCopyrights()}
    </>
  )
}
