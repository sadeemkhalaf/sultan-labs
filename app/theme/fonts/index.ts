// import * as Font from "expo-font"
import { StyleSheet } from "react-native"
import { scaleByDeviceWidth } from "../scalingUtil"
import { TypographyFontSize } from "./fontStyles"

export const initFonts = async () => {
  // Refer to ./assets/fonts/custom-fonts.md for instructions.
  // ...
  // Welcome back! Just uncomment this and replace/append with your font file names!
  // ⬇
  // await Font.loadAsync({
  //   Montserrat: require("./Montserrat-Regular.ttf"),
  //   "Montserrat-Regular": require("./Montserrat-Regular.ttf"),
  // })
}

const fontWeights = StyleSheet.create({
  bold: { fontWeight: "bold" },
  light: { fontWeight: "200" },
  medium: { fontWeight: "600" },
  regular: { fontWeight: "normal" },
})

export const fontStyles = StyleSheet.create({
  largeTitleBold: {
    fontSize: scaleByDeviceWidth(24),
    ...fontWeights.bold,
    lineHeight: scaleByDeviceWidth(32),
  },
  largeTitleRegular: {
    fontSize: scaleByDeviceWidth(24),
    ...fontWeights.regular,
    lineHeight: scaleByDeviceWidth(32),
  },
  subHeadBold: {
    fontSize: scaleByDeviceWidth(20),
    ...fontWeights.bold,
    lineHeight: scaleByDeviceWidth(26),
  },
  subHeadRegular: {
    fontSize: scaleByDeviceWidth(20),
    ...fontWeights.regular,
    lineHeight: scaleByDeviceWidth(26),
  },
  bodyTitleBold: {
    fontSize: scaleByDeviceWidth(16),
    ...fontWeights.bold,
    lineHeight: scaleByDeviceWidth(22),
  },
  bodyTitleRegular: {
    fontSize: scaleByDeviceWidth(16),
    ...fontWeights.regular,
    lineHeight: scaleByDeviceWidth(22),
  },
  bodyBold: {
    fontSize: scaleByDeviceWidth(14),
    ...fontWeights.bold,
    lineHeight: scaleByDeviceWidth(20),
  },
  bodyRegular: {
    fontSize: scaleByDeviceWidth(14),
    ...fontWeights.regular,
    lineHeight: scaleByDeviceWidth(20),
  },

  //  caption 1 ---------------------
  caption1Regular: {
    ...fontWeights.regular,
    fontSize: TypographyFontSize.CAPTION1,
    lineHeight: scaleByDeviceWidth(21),
  },
  caption1Medium: {
    ...fontWeights.medium,
    fontSize: TypographyFontSize.CAPTION1,
    lineHeight: scaleByDeviceWidth(21),
  },
  caption1Light: {
    ...fontWeights.light,
    fontSize: TypographyFontSize.CAPTION1,
    lineHeight: scaleByDeviceWidth(21),
  },

  //  caption 2 ---------------------
  caption2Regular: {
    ...fontWeights.regular,
    fontSize: TypographyFontSize.CAPTION2,
    lineHeight: scaleByDeviceWidth(18),
  },
  caption2Medium: {
    ...fontWeights.medium,
    fontSize: TypographyFontSize.CAPTION2,
    lineHeight: scaleByDeviceWidth(18),
  },
  caption2Light: {
    ...fontWeights.light,
    fontSize: TypographyFontSize.CAPTION2,
    lineHeight: scaleByDeviceWidth(18),
  },

  //  caption 3 ---------------------
  caption3Regular: {
    ...fontWeights.regular,
    fontSize: TypographyFontSize.CAPTION3,
    lineHeight: scaleByDeviceWidth(15),
  },
  caption3Medium: {
    ...fontWeights.medium,
    fontSize: TypographyFontSize.CAPTION3,
    lineHeight: scaleByDeviceWidth(15),
  },
  caption3Light: {
    ...fontWeights.light,
    fontSize: TypographyFontSize.CAPTION3,
    lineHeight: scaleByDeviceWidth(15),
  },

  //  caption 4 ---------------------
  caption4Regular: {
    ...fontWeights.regular,
    fontSize: TypographyFontSize.CAPTION4,
    lineHeight: scaleByDeviceWidth(12),
  },
  caption4Medium: {
    ...fontWeights.medium,
    fontSize: TypographyFontSize.CAPTION4,
    lineHeight: scaleByDeviceWidth(12),
  },
  caption4Light: {
    ...fontWeights.light,
    fontSize: TypographyFontSize.CAPTION4,
    lineHeight: scaleByDeviceWidth(12),
  },
})
