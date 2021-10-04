import React from "react"
import { ViewStyle, TouchableOpacity, View } from "react-native"
import { color } from "../../theme"
import { fontStyles } from "../../theme/fonts"
import { Text } from "../text/text"
import { moderateScale, scaleByDeviceWidth } from "../../theme/scalingUtil"
import { SvgIconButton } from "../icon/icon"


const CardContainer: ViewStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  height: scaleByDeviceWidth(120),
  marginVertical: moderateScale(8),
  borderRadius: scaleByDeviceWidth(20),
  paddingTop: moderateScale(16),
  paddingHorizontal: moderateScale(16),
  backgroundColor: color.palette.primaryRed,
}

const CIRCLE: ViewStyle = {
  height: 40,
  width: 40,
  alignItems: 'center',
  justifyContent: 'center'
}

const ICONVIEW: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
  // position: "absolute", bottom: 16, right: 8, zIndex: 1000 
}

export const Card = (
  title: string,
  description?: string,
  bg = color.palette.primaryRed,
  textColor = color.palette.white,
  withPrice = false,
  price = 0,
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
        <View style={ICONVIEW}>
          <Text style={fontStyles.caption2Medium} textColor={textColor}>
            {price}
          </Text>
          <SvgIconButton type={"next-circle"} fill={textColor} size={20} viewStyle={CIRCLE} />
        </View>
      </View>

    </TouchableOpacity>
  )
}
