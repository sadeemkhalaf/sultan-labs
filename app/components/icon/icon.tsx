import * as React from "react"
import { View, ImageStyle, GestureResponderEvent, ViewStyle, TouchableOpacity } from "react-native"
import { AutoImage as Image } from "../auto-image/auto-image"
import { IconProps, IconTypePreset } from "./icon.props"
import { icons } from "./icons"
import * as SvgIcons from './../../../assets/images/svg';
import { verticalScale } from "../../theme/scalingUtil"
import { BUTTON_ACTIVE_OPACITY } from "../../config/configs"

const ROOT: ImageStyle = {
  resizeMode: "contain",
}
const ICON_HEIGHT = verticalScale(40);

interface SvgIconButtonProps {
  type: IconTypePreset | string;
  size?: number;
  iconStyle?: ViewStyle;
  viewStyle?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
}

export const SvgIconButton = ({
  type,
  size = ICON_HEIGHT,
  iconStyle,
  viewStyle,
  onPress = () => { },
}: SvgIconButtonProps) => {
  const getIconType = () => {
    let icon = <SvgIcons.Show width={size} height={size} style={iconStyle} />;
    switch (type) {
      case 'show':
        icon = <SvgIcons.Show width={size} height={size} style={iconStyle} />;
        break;
      case 'hide':
        icon = <SvgIcons.Hide width={size} height={size} style={iconStyle} />;
        break;
      default:
        icon = <SvgIcons.Car width={size} height={size} style={iconStyle} />;
    }
    return icon;
  }

  const IconType = getIconType();

  return (
    <TouchableOpacity activeOpacity={BUTTON_ACTIVE_OPACITY} onPress={onPress} style={viewStyle}>
      {IconType}
    </TouchableOpacity>
  );
};

export function Icon(props: IconProps) {
  const { style: styleOverride, icon, containerStyle } = props

  return (
    <View style={containerStyle}>
      <Image style={[ROOT, styleOverride]} source={icons[icon]} />
    </View>
  )
}
