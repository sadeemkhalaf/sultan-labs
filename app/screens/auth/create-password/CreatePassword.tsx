import React, { useRef, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { color } from '../../../theme';
import { Header, Screen, Text, Button } from '../../../components';
import { moderateScale, scaleByDeviceWidth } from '../../../theme/scalingUtil';
import { fontStyles } from '../../../theme/fonts';
import { StackActions, useNavigation } from '@react-navigation/native';
import { styles } from '../authOptions/styles';
import { PasswordInputField } from '../shared-components';
import { useKeyboard } from '../../../utils/hooks/useKeyboard';
import { t } from 'i18n-js';
import { useSelector } from 'react-redux';
import { AccountReducer } from '../../../store/Action/types';
import { RootState } from '../../../store/Reducer';
import { firebase } from '../../../../fb-configs';
import { Password } from '../../../../assets/images/svg';

const CONTAINER: ViewStyle = {
    backgroundColor: color.palette.white,
    paddingHorizontal: scaleByDeviceWidth(24),
    justifyContent: 'space-between'
}
const INPUTVIEW: ViewStyle = {
    marginTop: scaleByDeviceWidth(32),
    flex: 1,
    justifyContent: 'flex-start'
}

const CreatePasswordScreen = () => {

    const [password, setPassword] = useState('pass123');
    const [checkPassword, setCheckPassword] = useState('pass123');
    const passwordRef = useRef(null);
    const checkPasswordRef = useRef(null);
    const [keyboardOpen] = useKeyboard();
    const { tempAccount } = useSelector<RootState>(
        (state) => state.Account,
    ) as AccountReducer;

    const verifyPassword = () => {
        return password === checkPassword;
    }

    const handleCreateAccount = async () => {
        try {
            await firebase.auth().currentUser.updateEmail(tempAccount.email)
            await firebase.auth().currentUser.updatePassword(password);
            navigate.navigate('authStack', { screen: 'createAccount' });
        } catch (error) {
            console.log('handleCreateAccount-Error: ', error)
        }
    }


    const navigate = useNavigation();
    return (
        <Screen style={CONTAINER} preset="fixed" >
            <Header />
            <Text style={fontStyles.largeTitleBold} textColor={color.palette.black}>{'Create Account\nPassword'}</Text>
            {!keyboardOpen && <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', paddingVertical: moderateScale(32) }}>
                <Password height={scaleByDeviceWidth(135)} width={scaleByDeviceWidth(135)} />
            </View>}
            <View style={[styles.inputWrapper, INPUTVIEW]}>
                {PasswordInputField(password, setPassword, passwordRef)}
                {PasswordInputField(checkPassword, setCheckPassword, checkPasswordRef, 'Confirm Password')}
            </View>
            <Button disabled={password.length < 1 || !verifyPassword()} onPress={handleCreateAccount} text={t('common.confirm')} textStyle={fontStyles.bodyRegular} style={{ marginBottom: scaleByDeviceWidth(keyboardOpen ? 16 : 56) }}></Button>
        </Screen>
    )
}

export { CreatePasswordScreen }

