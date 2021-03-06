import React from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { HeaderProps } from "./header.props"

import { Text } from "../text/text"
import { SvgIconButton } from "../icon/icon"
import { translate } from "../../i18n/"
import { color } from "../../theme"
import { scaleByDeviceWidth } from "../../theme/scalingUtil"
import { useNavigation } from "@react-navigation/core"
import { LogoFull } from "../../../assets/images/svg"

// static styles
const ROOT: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginTop: scaleByDeviceWidth(16),
  paddingBottom: scaleByDeviceWidth(16)
}

const TITLE: TextStyle = { textAlign: "center" }
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: "center" }
const LEFT: ViewStyle = { width: 32 }
const RIGHT: ViewStyle = { width: 32 }

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
  const {
    onLeftPress,
    onRightPress,
    rightIcon,
    leftIcon,
    headerText,
    headerTx,
    style,
    titleStyle,
    profile
  } = props
  const header = headerText || (headerTx && translate(headerTx)) || ""
  const navigation = useNavigation();
  const HEART_DOT: ViewStyle = {
    height: scaleByDeviceWidth(8),
    width: scaleByDeviceWidth(8),
    borderRadius: 4,
    backgroundColor: color.palette.primaryRed,
    position: "absolute",
    top: -2,
    right: -2,
  }

  return (
    <View style={[ROOT, style]}>
      {leftIcon ? (
        <><SvgIconButton type={leftIcon} size={20} onPress={onLeftPress} />
        <LogoFull heigh={50} width={50}/></>
      ) : (
        <>
         <LogoFull heigh={50} width={50}/>
        <View style={LEFT} />
        </>
      )}
     
      <View style={TITLE_MIDDLE}>
        <Text style={[TITLE, titleStyle]} text={header} />
      </View>
      {profile && (
        <View style={{ marginRight: scaleByDeviceWidth(8) }}>
          <SvgIconButton onPress={() => navigation.navigate("mainStack", { screen: "settings" })} type={'person'} size={20} />
        </View>
      )}
      {rightIcon ? (
        <View>
          <SvgIconButton onPress={onRightPress} type={rightIcon} size={20} />
          {rightIcon === "heart" && (
            <View
              style={HEART_DOT}
            />
          )}
        </View>
      ) : (
        <View style={RIGHT} />
      )}
    </View>
  )
}
