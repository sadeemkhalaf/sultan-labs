import React from "react"
import { ViewStyle, TouchableOpacity, View } from "react-native"
import { color } from "../../theme"
import { fontStyles } from "../../theme/fonts"
import { Text } from "../index"
import { moderateScale, scaleByDeviceWidth } from "../../theme/scalingUtil"
import { SvgIconButton } from "../icon/icon"

const CardContainer: ViewStyle = {
  width: "100%",
  height: scaleByDeviceWidth(120),
  display: "flex",
  borderRadius: scaleByDeviceWidth(20),
  marginVertical: moderateScale(8),
  backgroundColor: color.palette.primaryRed,
  justifyContent: "flex-start",
  padding: moderateScale(16),
}

export const Card = (
  title: string,
  description?: string,
  bg = color.palette.primaryRed,
  navigateTp?: () => void,
) => {
  return (
    <TouchableOpacity onPress={navigateTp}>
      <View style={[CardContainer, { backgroundColor: bg }]}>
        <Text style={fontStyles.bodyTitleBold} textColor={color.palette.white}>
          {title}
        </Text>
        <Text style={fontStyles.bodyRegular} textColor={color.palette.white}>
          {description || ""}
        </Text>
      </View>
      <View style={{ position: "absolute", bottom: 16, right: 8, zIndex: 1000 }}>
        <SvgIconButton type={"next-circle"} fill={color.palette.white} size={20} viewStyle={{height: 40, width: 40, alignItems: 'center', justifyContent: 'center'}} />
      </View>
    </TouchableOpacity>
  )
}
