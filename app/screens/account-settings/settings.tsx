import { useNavigation } from "@react-navigation/native"
import React from "react"
import { View, ViewStyle } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { Header, SvgIconButton, Text } from "../../components"
import { AccountReducer } from "../../store/Action/types"
import { RootState } from "../../store/Reducer"
import { color } from "../../theme"
import { moderateScale, scaleByDeviceWidth } from "../../theme/scalingUtil"
import { useKeyboard } from "../../utils/hooks/useKeyboard"
import { Screen } from "../../components"
import { fontStyles } from "../../theme/fonts"
import { renderCopyrights } from "../auth"

const CONTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
  paddingHorizontal: scaleByDeviceWidth(24),
  paddingBottom: moderateScale(56),
}

const SettingsRow = (icon, title) => {
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", paddingBottom: scaleByDeviceWidth(24) }}
    >
      <SvgIconButton
        type={icon || "person"}
        size={scaleByDeviceWidth(24)}
        viewStyle={{
          padding: scaleByDeviceWidth(8),
          backgroundColor: color.palette.underLineFieldBorder,
          width: scaleByDeviceWidth(60),
          height: scaleByDeviceWidth(60),
          borderRadius: scaleByDeviceWidth(40),
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      <View>
        <Text
          style={[fontStyles.bodyBold, { marginLeft: scaleByDeviceWidth(16) }]}
          textColor={color.palette.black}
        >
          {title || "Account"}
        </Text>
      </View>
    </View>
  )
}

const SettingsScreen = () => {
  const dispatch = useDispatch()

  // test
  const accountStore = useSelector<RootState>((state) => state.Account) as AccountReducer

  const navigate = useNavigation()
  const [keyboardOpen] = useKeyboard()

  return (
    <>
      <Screen style={CONTAINER} preset="scroll">
        <Header leftIcon={"back"} onLeftPress={() => navigate.goBack()} />
        <Text style={fontStyles.largeTitleBold} textColor={color.palette.black}>
          {"Settings"}
        </Text>
        <View style={{ marginTop: scaleByDeviceWidth(32) }} />
        <Text
          style={[fontStyles.bodyTitleBold, { marginBottom: scaleByDeviceWidth(32) }]}
          textColor={color.palette.black}
        >
          {"Account"}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <SvgIconButton
            type={"person"}
            size={scaleByDeviceWidth(24)}
            viewStyle={{
              padding: scaleByDeviceWidth(8),
              backgroundColor: color.palette.underLineFieldBorder,
              width: scaleByDeviceWidth(60),
              height: scaleByDeviceWidth(60),
              borderRadius: scaleByDeviceWidth(40),
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <View style={{ marginLeft: scaleByDeviceWidth(16) }}>
            <Text
              style={[fontStyles.bodyTitleBold, { marginBottom: scaleByDeviceWidth(8) }]}
              textColor={color.palette.black}
            >
              {"Account Owner"}
            </Text>
            <Text style={[fontStyles.caption2Regular]} textColor={color.palette.dustyBlue}>
              {"Personal Information"}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: scaleByDeviceWidth(32) }} />
        <Text
          style={[fontStyles.bodyTitleBold, { marginBottom: scaleByDeviceWidth(32) }]}
          textColor={color.palette.dustyBlue}
        >
          {"Settings"}
        </Text>
        {SettingsRow("family", "Family Memebers")}
        {SettingsRow("family", "Family Memebers")}
        {SettingsRow("family", "Family Memebers")}
        {SettingsRow("family", "Family Memebers")}
        {SettingsRow("family", "Family Memebers")}
      </Screen>
      {renderCopyrights()}
    </>
  )
}

export { SettingsScreen }
