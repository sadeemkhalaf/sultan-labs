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

const CIRCLE: ViewStyle = {
  height: 40,
  width: 40,
  alignItems: 'center',
  justifyContent: 'center'
}

const ICONVIEW: ViewStyle = { position: "absolute", bottom: 16, right: 8, zIndex: 1000 }

export const Card = (
  title: string,
  description?: string,
  bg = color.palette.primaryRed,
  textColor = color.palette.white,
  navigateTp?: () => void,
) => {
  return (
    <TouchableOpacity onPress={navigateTp}>
      <View style={[CardContainer, { backgroundColor: bg }]}>
        <Text style={fontStyles.bodyTitleBold} textColor={textColor}>
          {title}
        </Text>
        <Text style={fontStyles.bodyRegular} textColor={textColor}>
          {description || ""}
        </Text>
      </View>
      <View style={ICONVIEW}>
        <SvgIconButton type={"next-circle"} fill={textColor} size={20} viewStyle={CIRCLE} />
        
      </View>
 
    </TouchableOpacity>
  )
}
