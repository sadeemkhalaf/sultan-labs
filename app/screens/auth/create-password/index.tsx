import React, { useRef, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { color } from '../../../theme';
import { Header, Screen, Text, Button } from '../../../components';
import { scaleByDeviceWidth } from '../../../theme/scalingUtil';
import { fontStyles } from '../../../theme/fonts';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../authOptions/styles';
import { PasswordInputField } from '../shared-components';
import { useKeyboard } from '../../../utils/hooks/useKeyboard';
import { t } from 'i18n-js';

const CONTAINER: ViewStyle = {
    backgroundColor: color.palette.white,
    paddingHorizontal: scaleByDeviceWidth(24),
}
const INPUTVIEW: ViewStyle = {
    marginTop: scaleByDeviceWidth(32),
    flex: 1,
    justifyContent: 'flex-start'
}

const CreatePasswordScreen = () => {

    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');

    const passwordRef = useRef(null);
    const checkPasswordRef = useRef(null);

    const [keyboardOpen] = useKeyboard();
    
    const navigate = useNavigation();
    return (
        <Screen style={CONTAINER} preset="fixed" >
            <Header leftIcon={'back'} onLeftPress={() => navigate.goBack()} />
            <Text style={fontStyles.largeTitleBold} textColor={color.palette.black}>{'Create Account\nPassword'}</Text>
            <View style={[styles.inputWrapper, INPUTVIEW]}>
                {PasswordInputField(password, setPassword, passwordRef)}
                {PasswordInputField(checkPassword, setCheckPassword, checkPasswordRef, 'Confirm Password')}
            </View>
            <Button onPress={() => navigate.navigate('authStack', { screen: 'createAccount' })} text={t('common.confirm')} textStyle={fontStyles.bodyRegular} style={{ marginBottom: scaleByDeviceWidth(keyboardOpen ? 16 : 56) }}></Button>
        </Screen>
    )
}

export { CreatePasswordScreen }

