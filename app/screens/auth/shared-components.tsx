import React from 'react'
import { StyleSheet, View } from 'react-native';
import { SvgIconButton, TextField } from '../../components';


const style = StyleSheet.create({
    svgIconStyle: {
        bottom: 24,
        position: 'absolute',
        right: 16,
    }

});

const PasswordInputField = (password, setPassword, inputRef) => {

    return (
        <View>
            <TextField
                forwardedRef={inputRef}
                value={password}
                onChangeText={setPassword}
                label={'Password'}
                secureTextEntry={true}
            />
            <SvgIconButton type={'show'} size={16} viewStyle={style.svgIconStyle} />
        </View>
    );
}

const EmailInputField = (email, setEmail, inputRef) => {
    return (
        <TextField
            forwardedRef={inputRef}
            value={email}
            onChangeText={setEmail}
            label={'Email'}
        />
    )
}

const TextInputField = (text, setText, label = '', inputRef) => {
    return (
        <TextField
            forwardedRef={inputRef}
            value={text}
            onChangeText={setText}
            label={label}
        />
    )
}

export { PasswordInputField, EmailInputField, TextInputField };
