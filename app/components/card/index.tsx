import React from 'react';
import { ViewStyle, TouchableOpacity, View } from 'react-native';
import { color } from '../../theme';
import { fontStyles } from '../../theme/fonts';
import { Text } from '../index';
import { moderateScale } from '../../theme/scalingUtil';

const CardContainer: ViewStyle = {
    width: '100%',
    height: 120,
    display: 'flex',
    borderRadius: 20,
    marginVertical: 8,
    backgroundColor: color.palette.offWhite,
    justifyContent: 'flex-start',
    padding: moderateScale(16)
}



export const Card = (title: string, description?: string, navigateTp?: () => void) => {
    return (
        <TouchableOpacity onPress={navigateTp}>
            <View style={CardContainer} >

                <Text style={fontStyles.largeTitleBold} textColor={color.palette.orangeDarker}>{title}</Text>
                <Text style={fontStyles.bodyRegular} textColor={color.palette.lightGrey}>{description || ''}</Text>
            </View>
        </TouchableOpacity>
    );
}