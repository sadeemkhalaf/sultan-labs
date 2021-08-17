import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scaleByDeviceWidth = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + ( scaleByDeviceWidth(size) - size ) * factor;

/*
ref: https://github.com/nirsky/react-native-scaling-example
    examples on how to use:
        - width: scaleByDeviceWidth(80)
        - height: verticalScale(400)
        - margin: moderateScale(16)
*/ 

export {scaleByDeviceWidth, verticalScale, moderateScale, width, height};
