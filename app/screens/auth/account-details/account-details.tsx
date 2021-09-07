import { useNavigation } from '@react-navigation/native'
import { t } from 'i18n-js'
import React, { useRef, useState } from 'react'
import { View, ViewStyle } from 'react-native'
import { useFormik } from 'formik'
import { color } from '../../../theme'
import { fontStyles } from '../../../theme/fonts'
import { scaleByDeviceWidth } from '../../../theme/scalingUtil'
import { useKeyboard } from '../../../utils/hooks/useKeyboard'
import { styles } from '../authOptions/styles'
import { OptionsMenuField, TextInputField } from '../shared-components'
import { Header, Screen, Button, Text } from './../../../components'
import * as Yup from 'yup';


const CONTAINER: ViewStyle = {
    backgroundColor: color.palette.white,
    paddingHorizontal: scaleByDeviceWidth(24),
}
const INPUTVIEW: ViewStyle = {
    marginTop: scaleByDeviceWidth(32),
    flex: 1,
    justifyContent: 'flex-start'
}

const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().required('Required'),
    bloodType: Yup.string().required('Required'),
    birthDate: Yup.string(),
    email: Yup.string().email().required(),
    mobileNumber: Yup.string().length(10),
    insurance: Yup.string(),
    country: Yup.string(),
    city: Yup.string(),
    address: Yup.string()
});


const AccountDetailsScreen = () => {

    const { handleChange, handleSubmit, values, errors, dirty, resetForm, handleBlur } = useFormik({
        validationSchema: RegisterSchema,
        initialValues: {
            fullName: '',
            gender: '',
            bloodType: '',
            birthDate: '',
            insurance: '',
            mobileNumber: '',
            email: '',
            country: '',
            city: '',
            address: ''
        },
        onSubmit: values => {
            alert(`Full Name: ${values.fullName}, BloodType: ${values.bloodType}`)
        }
    });

    const navigate = useNavigation();
    const [keyboardOpen] = useKeyboard();

    // fields' refs
    const nameRef = useRef(null);
    const genderRef = useRef(null);
    const bloodTypeRef = useRef(null);
    const bdRef = useRef(null);
    const mobileRef = useRef(null);
    const insuranceRef = useRef(null);
    const emailRef = useRef(null);
    const countryRef = useRef(null);
    const cityRef = useRef(null);
    const addressRef = useRef(null);


    return (
        <>
            <Screen style={CONTAINER} preset="scroll" >
                <Header leftIcon={'back'} onLeftPress={() => navigate.goBack()} />
                <Text style={fontStyles.largeTitleBold} textColor={color.palette.black}>{'Create Account'}</Text>
                <Text style={[fontStyles.caption2Regular, { marginBottom: scaleByDeviceWidth(32) }]} textColor={color.palette.dustyBlue}>{t('auth.firstaccount')}</Text>
                <View style={[styles.inputWrapper, INPUTVIEW]}>
                    {TextInputField(values.fullName, handleChange('fullName'), 'Name', nameRef)}
                    {TextInputField(values.fullName, handleChange('gender'), 'Gender', genderRef)}
                    {TextInputField(values.bloodType, handleChange('bloodType'), 'Blood Type', bloodTypeRef)}
                    {TextInputField(values.fullName, handleChange('birthDate'), 'Date of Birth', bdRef)}
                    {TextInputField(values.bloodType, handleChange('insurance'), 'Insurance', insuranceRef)}
                    <Text style={[fontStyles.subHeadBold, { marginVertical: scaleByDeviceWidth(16) }]} textColor={color.palette.black}>{'Contact'}</Text>
                    {TextInputField(values.fullName, handleChange('mobile'), 'Mobile Number', mobileRef)}
                    {TextInputField(values.fullName, handleChange('email'), 'Email', emailRef)}
                    <Text style={[fontStyles.subHeadBold, { marginVertical: scaleByDeviceWidth(16) }]} textColor={color.palette.black}>{'Address'}</Text>
                    {TextInputField(values.country, handleChange('country'), 'Country', countryRef)}
                    {TextInputField(values.fullName, handleChange('city'), 'City', cityRef)}
                    {TextInputField(values.fullName, handleChange('address'), 'Address', addressRef)}
                </View>
                <Button onPress={() => navigate.navigate('mainStack', { screen: 'home' })} text={t('common.confirm')} textStyle={fontStyles.bodyRegular} style={{ marginTop: scaleByDeviceWidth(56), marginBottom: scaleByDeviceWidth(keyboardOpen ? 16 : 56) }}></Button>
            </Screen>
        </>
    )
}

export { AccountDetailsScreen }


