import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Close } from '../../../assets/images/svg';
import { SvgIconButton, TextField } from '../../components';
import { color } from '../../theme';
import { scaleByDeviceWidth } from '../../theme/scalingUtil';


export const sharedStyle = StyleSheet.create({
    svgIconStyle: {
        bottom: 24,
        position: 'absolute',
        right: 16,
    }

});

const PasswordInputField = (password, setPassword, inputRef) => {

    const [show, setShow] = useState(true);
    const handleShow = () => setShow(!show)

    return (
        <View>
            <TextField
                forwardedRef={inputRef}
                value={password}
                onChangeText={setPassword}
                label={'Password'}
                secureTextEntry={show}
            />
            <SvgIconButton type={'show'} size={16} viewStyle={sharedStyle.svgIconStyle} onPress={handleShow} />
        </View>
    );
}

const EmailInputField = (email, setEmail, inputRef) => {
    return (
        <View>
            <TextField
                forwardedRef={inputRef}
                value={email}
                onChangeText={setEmail}
                label={'Email'}
            />
        </View>
    )
}

const TextInputField = (text, setText, label = '', inputRef) => {
    return (
        <View>
            <TextField
                forwardedRef={inputRef}
                value={text}
                onChangeText={setText}
                label={label}
            />
        </View>
    )
}


const CLOSE_STYLE: ViewStyle = {
    backgroundColor: color.palette.white,
    zIndex: 1001,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 48,
    right: 32,
    height: scaleByDeviceWidth(48),
    width: scaleByDeviceWidth(48),
    borderRadius: scaleByDeviceWidth(30)
}

export const CloseButton = ({ text = '' }) => {
    const navigate = useNavigation();

    return (
        <TouchableOpacity style={CLOSE_STYLE}
            onPress={() => {
                text.length > 0 ? navigate.navigate('authStack', { screen: text }) : navigate.goBack()
            }}>
            <Close height={16} width={16} fill={color.palette.black} />
        </TouchableOpacity>
    );
};

export { PasswordInputField, EmailInputField, TextInputField };
