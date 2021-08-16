import * as React from "react"
import { View, ImageStyle, GestureResponderEvent, ViewStyle, TouchableOpacity } from "react-native"
import { AutoImage as Image } from "../auto-image/auto-image"
import { IconProps, IconTypePreset } from "./icon.props"
import { icons } from "./icons"
import * as SvgIcons from "./../../../assets/images/svg"
import { scaleByDeviceWidth, verticalScale } from "../../theme/scalingUtil"
import { BUTTON_ACTIVE_OPACITY } from "../../config/configs"
import { color } from "../../theme"

const ROOT: ImageStyle = {
  resizeMode: "contain",
}
const ICON_HEIGHT = verticalScale(40)

export type SvgIconType =
  | "close"
  | "show"
  | "hide"
  | "calendar"
  | "next"
  | "next-circle"
  | "back"
  | "search"
  | "heart"
  | "pin"

interface SvgIconButtonProps {
  type: IconTypePreset | SvgIconType
  size?: number
  iconStyle?: ViewStyle
  viewStyle?: ViewStyle
  fill?: string
  onPress?: (event: GestureResponderEvent) => void
}

export const SvgIconButton = ({
  type,
  size = ICON_HEIGHT,
  iconStyle,
  viewStyle,
  fill = color.palette.darkBlue,
  onPress = () => {},
}: SvgIconButtonProps) => {
  const sizeScaled = scaleByDeviceWidth(size);
  const getIconType = () => {
    let icon = <SvgIcons.Show width={sizeScaled} height={sizeScaled} style={iconStyle} fill={fill}/>
    switch (type) {
      case "close":
        icon = <SvgIcons.Close width={sizeScaled} height={sizeScaled} style={iconStyle} fill={fill} />
        break
      case "show":
        icon = <SvgIcons.Show width={sizeScaled} height={sizeScaled} style={iconStyle} fill={fill} />
        break
      case "hide":
        icon = <SvgIcons.Hide width={sizeScaled} height={sizeScaled} style={iconStyle} fill={fill} />
        break
      case "back":
        icon = <SvgIcons.ArrowBack width={sizeScaled} height={sizeScaled} style={iconStyle} fill={fill} />
        break
      case "next":
        icon = <SvgIcons.Next width={sizeScaled} height={sizeScaled} style={iconStyle} fill={fill} />
        break
      case "next-circle":
        icon = <SvgIcons.NextCircle width={sizeScaled} height={sizeScaled} style={iconStyle} fill={fill} />
        break
      case "search":
        icon = <SvgIcons.Search width={sizeScaled} height={sizeScaled} style={iconStyle} fill={fill} />
        break
      case "calendar":
        icon = <SvgIcons.Calendar width={sizeScaled} height={sizeScaled} style={iconStyle} fill={fill} />
        break
      case "pin":
        icon = <SvgIcons.Pin width={sizeScaled} height={sizeScaled} style={iconStyle} fill={fill} />
        break
      case "heart":
        icon = <SvgIcons.Heart width={sizeScaled} height={sizeScaled} style={iconStyle} fill={fill} />
        break
      default:
        icon = <SvgIcons.Car width={sizeScaled} height={sizeScaled} style={iconStyle} fill={fill} />
    }
    return icon
  }

  const IconType = getIconType()

  return (
    <TouchableOpacity activeOpacity={BUTTON_ACTIVE_OPACITY} onPress={onPress} style={viewStyle}>
      {IconType}
    </TouchableOpacity>
  )
}

export function Icon(props: IconProps) {
  const { style: styleOverride, icon, containerStyle } = props

  return (
    <View style={containerStyle}>
      <Image style={[ROOT, styleOverride]} source={icons[icon]} />
    </View>
  )
}
