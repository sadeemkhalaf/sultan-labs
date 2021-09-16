import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Close } from '../../../assets/images/svg';
import { SvgIconButton, TextField, Text } from '../../components';
import { color } from '../../theme';
import { moderateScale, scaleByDeviceWidth } from '../../theme/scalingUtil';

export const sharedStyle = StyleSheet.create({
    svgIconStyle: {
        bottom: 24,
        position: 'absolute',
        right: 16,
    }

});

const PasswordInputField = (password, setPassword, inputRef, title?: string) => {

    const [show, setShow] = useState(true);
    const handleShow = () => setShow(!show)

    return (
        <View>
            <TextField
                forwardedRef={inputRef}
                value={password}
                onChangeText={setPassword}
                label={title ? title : 'Password'}
                secureTextEntry={show}
            />
            <SvgIconButton type={'show'} size={16} viewStyle={sharedStyle.svgIconStyle} onPress={handleShow} />
        </View>
    );
}

const EmailInputField = (email, setEmail, inputRef, handleBlur = () => {}) => {
    return (

        <TextField
            autoCapitalize={'none'}
            forwardedRef={inputRef}
            value={email}
            onChangeText={setEmail}
            label={'Email'}
        />
    )
}

const TextInputField = (text: string, setText: (text: string) => void, label = '', inputRef, handleBlur, active = true) => {
    return (
        <TextField
            forwardedRef={inputRef}
            value={text}
            onChangeText={setText}
            label={label}
            onBlur={handleBlur}
            editable={active}
        />
    )
}

const OptionsMenuField = (text, setText, label = '') => {

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);

    const BOXSTYLE: ViewStyle = { borderWidth: 0, borderBottomWidth: scaleByDeviceWidth(1), borderBottomColor: color.palette.underLineFieldBorder, marginBottom: scaleByDeviceWidth(16), width: '100%' }
    return (
        <>
            <View>
                <Text textColor={color.palette.dustyBlue} preset="fieldLabel" style={{ marginBottom: moderateScale(8) }} text={label} />
            </View>
            <DropDownPicker
                style={BOXSTYLE}
                open={open}
                value={text}
                items={items}
                setOpen={setOpen}
                setValue={setText}
                setItems={setItems}
            />
        </>
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

export const CloseButton = ({ text = 'authStack', screen= 'authOptions' }) => {
    const navigate = useNavigation();

    return (
        <TouchableOpacity style={CLOSE_STYLE}
            onPress={() => {
                text.length > 0 ? navigate.navigate(text, { screen: screen }) : navigate.goBack()
            }}>
            <Close height={16} width={16} fill={color.palette.black} />
        </TouchableOpacity>
    );
};

export { PasswordInputField, OptionsMenuField, EmailInputField, TextInputField };
