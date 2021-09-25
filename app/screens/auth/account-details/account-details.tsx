import { useNavigation } from "@react-navigation/native"
import { t } from "i18n-js"
import React, { useRef } from "react"
import { View, ViewStyle } from "react-native"
import { useFormik } from "formik"
import { color } from "../../../theme"
import { fontStyles } from "../../../theme/fonts"
import { scaleByDeviceWidth } from "../../../theme/scalingUtil"
import { useKeyboard } from "../../../utils/hooks/useKeyboard"
import { styles } from "../authOptions/styles"
import { TextInputField } from "../shared-components"
import { Header, Screen, Button, Text } from "./../../../components"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { AccountReducer } from "../../../store/Action/types"
import { RootState } from "../../../store/Reducer"
import { firestore } from "../../../../fb-configs"
import { loginUser } from "../../../store/Action"

const CONTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
  paddingHorizontal: scaleByDeviceWidth(24),
}
const INPUTVIEW: ViewStyle = {
  marginTop: scaleByDeviceWidth(32),
  flex: 1,
  justifyContent: "flex-start",
}

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string().required("Required"),
  bloodType: Yup.string().required("Required"),
  birthDate: Yup.string(),
  email: Yup.string().email().required(),
  mobileNumber: Yup.string().length(10),
  insurance: Yup.string(),
  country: Yup.string(),
  city: Yup.string(),
  address: Yup.string(),
})

const AccountDetailsScreen = () => {
  const dispatch = useDispatch()

  // test
  const accountStore = useSelector<RootState>((state) => state.Account) as AccountReducer

  const { handleChange, handleSubmit, values, errors, dirty, resetForm, handleBlur } = useFormik({
    validationSchema: RegisterSchema,
    initialValues: {
      fullName: "sadeem ahmad",
      gender: "female",
      bloodType: "A+",
      birthDate: "1992-7-28",
      insurance: "GIG",
      mobileNumber: accountStore.tempAccount.mobileNumber || "",
      email: accountStore.tempAccount.email || "",
      country: "Jordan",
      city: "Amman",
      address: "Amman-Khalda, Wasfi Al-Tal street",
    },
    onSubmit: (values) => {
      alert(`Full Name: ${values.fullName}, BloodType: ${values.bloodType}`)
    },
  })

  const navigate = useNavigation()
  const [keyboardOpen] = useKeyboard()

  // fields' refs
  const nameRef = useRef(null)
  const genderRef = useRef(null)
  const bloodTypeRef = useRef(null)
  const bdRef = useRef(null)
  const mobileRef = useRef(null)
  const insuranceRef = useRef(null)
  const emailRef = useRef(null)
  const countryRef = useRef(null)
  const cityRef = useRef(null)
  const addressRef = useRef(null)

  const addUserDetails = async () => {
    const uid = accountStore?.user?.user?._user?.uid

    firestore().collection("users")
      .doc(uid)
      .set({ ...values, _id: uid })
      .then((data) => {
        console.log(data);
        dispatch(loginUser({user: {...values, id: uid, _id: uid }, uid: uid, loggedIn: true, userType: 'user'}))
      })
      .then((err) => console.log(err))
    // fs.collection('users').get().then((changes) => console.log(changes))
  }
  const handleSubmitForm = () => {
    addUserDetails()
    navigate.navigate("mainStack", { screen: "home" })
  }

  return (
    <>
      <Screen style={CONTAINER} preset="scroll">
        <Header leftIcon={"back"} onLeftPress={() => navigate.goBack()} />
        <Text style={fontStyles.largeTitleBold} textColor={color.palette.black}>
          {"Create Account"}
        </Text>
        <Text
          style={[fontStyles.caption2Regular, { marginBottom: scaleByDeviceWidth(32) }]}
          textColor={color.palette.dustyBlue}
        >
          {t("auth.firstaccount")}
        </Text>
        <View style={[styles.inputWrapper, INPUTVIEW]}>
          {TextInputField(
            values.fullName,
            handleChange("fullName"),
            "Name",
            nameRef,
            handleBlur("fullName"),
          )}
          {TextInputField(
            values.gender,
            handleChange("gender"),
            "Gender",
            genderRef,
            handleBlur("gender"),
          )}
          {TextInputField(
            values.bloodType,
            handleChange("bloodType"),
            "Blood Type",
            bloodTypeRef,
            handleBlur("bloodType"),
          )}
          {TextInputField(
            values.birthDate,
            handleChange("birthDate"),
            "Date of Birth",
            bdRef,
            handleBlur("birthDate"),
          )}
          {TextInputField(
            values.insurance,
            handleChange("insurance"),
            "Insurance",
            insuranceRef,
            handleBlur("insurance"),
          )}
          <Text
            style={[fontStyles.subHeadBold, { marginVertical: scaleByDeviceWidth(16) }]}
            textColor={color.palette.black}
          >
            {"Contact"}
          </Text>
          {TextInputField(
            values.mobileNumber,
            handleChange("mobile"),
            "Mobile Number",
            mobileRef,
            handleBlur("mobile"),
            false,
          )}
          {TextInputField(
            values.email,
            handleChange("email"),
            "Email",
            emailRef,
            handleBlur("email"),
            false,
          )}
          <Text
            style={[fontStyles.subHeadBold, { marginVertical: scaleByDeviceWidth(16) }]}
            textColor={color.palette.black}
          >
            {"Address"}
          </Text>
          {TextInputField(
            values.country,
            handleChange("country"),
            "Country",
            countryRef,
            handleBlur("country"),
          )}
          {TextInputField(values.city, handleChange("city"), "City", cityRef, handleBlur("city"))}
          {TextInputField(
            values.address,
            handleChange("address"),
            "Address",
            addressRef,
            handleBlur("address"),
          )}
        </View>
        <Button
          onPress={handleSubmitForm}
          text={t("common.confirm")}
          textStyle={fontStyles.bodyRegular}
          style={{
            marginTop: scaleByDeviceWidth(56),
            marginBottom: scaleByDeviceWidth(keyboardOpen ? 16 : 56),
          }}
        ></Button>
      </Screen>
    </>
  )
}

export { AccountDetailsScreen }
