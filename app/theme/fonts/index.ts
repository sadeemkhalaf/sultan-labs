// import * as Font from "expo-font"
import {StyleSheet} from 'react-native';
import { scaleByDeviceWidth } from "../scalingUtil";

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


export const fontStyles = StyleSheet.create({
  largeTitleBold: {
    fontSize: scaleByDeviceWidth(24),
    fontWeight: 'bold',
    lineHeight: scaleByDeviceWidth(32),
  },
  largeTitleRegular: {
    fontSize: scaleByDeviceWidth(24),
    fontWeight: 'normal',
    lineHeight: scaleByDeviceWidth(32),
  },
  subHeadBold: {
    fontSize: scaleByDeviceWidth(20),
    fontWeight: 'bold',
    lineHeight: scaleByDeviceWidth(26),
  },
  subHeadRegular: {
    fontSize: scaleByDeviceWidth(20),
    fontWeight: 'normal',
    lineHeight: scaleByDeviceWidth(26),
  },
  bodyTitleBold: {
    fontSize: scaleByDeviceWidth(16),
    fontWeight: 'bold',
    lineHeight: scaleByDeviceWidth(22),
  },
  bodyTitleRegular: {
    fontSize: scaleByDeviceWidth(16),
    fontWeight: 'normal',
    lineHeight: scaleByDeviceWidth(22),
  },
  bodyBold: {
    fontSize: scaleByDeviceWidth(14),
    fontWeight: 'bold',
    lineHeight: scaleByDeviceWidth(20),
  },
  bodyRegular: {
    fontSize: scaleByDeviceWidth(14),
    fontWeight: 'normal',
    lineHeight: scaleByDeviceWidth(20),
  },
});

