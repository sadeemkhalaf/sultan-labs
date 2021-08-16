import React from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { HeaderProps } from "./header.props"

import { Text } from "../text/text"
import { SvgIconButton } from "../icon/icon"
import { translate } from "../../i18n/"
import { color } from "../../theme"
import { scaleByDeviceWidth } from "../../theme/scalingUtil"

// static styles
const ROOT: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginTop: scaleByDeviceWidth(16)
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
  } = props
  const header = headerText || (headerTx && translate(headerTx)) || ""

  return (
    <View style={[ROOT, style]}>
      {leftIcon ? (
        <SvgIconButton type={leftIcon} size={20} onPress={onLeftPress} />
      ) : (
        <View style={LEFT} />
      )}
      <View style={TITLE_MIDDLE}>
        <Text style={[TITLE, titleStyle]} text={header} />
      </View>
      {rightIcon ? (
        <View>
          <SvgIconButton onPress={onRightPress} type={rightIcon} size={20} />
          {rightIcon === "heart" && (
            <View
              style={{
                height: scaleByDeviceWidth(8),
                width: scaleByDeviceWidth(8),
                borderRadius: 4,
                backgroundColor: color.palette.primaryRed,
                position: "absolute",
                top: -2,
                right: -2,
              }}
            />
          )}
        </View>
      ) : (
        <View style={RIGHT} />
      )}
    </View>
  )
}
