import { useNavigation } from "@react-navigation/native"
import { t } from "i18n-js"
import React, { useRef, useState } from "react"
import { View, ViewStyle } from "react-native"
import { useFormik } from "formik"
import { color } from "../../../theme"
import { fontStyles } from "../../../theme/fonts"
import { moderateScale, scaleByDeviceWidth } from "../../../theme/scalingUtil"
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
import { Autocomplete, AutocompleteItem, Datepicker, IndexPath, Select, SelectItem } from "@ui-kitten/components"
import { Blood, Calendar } from "../../../../assets/images/svg"
import { InsuranceType, Gender, BloodType } from "./constants"

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
  const accountStore = useSelector<RootState>((state) => state.Account) as AccountReducer


  const { handleChange, handleSubmit, values, errors, dirty, resetForm, handleBlur, setFieldValue } = useFormik({
    validationSchema: RegisterSchema,
    initialValues: {
      fullName: accountStore.tempAccount?.fullName || "",
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
    }, enableReinitialize: true,
  })


  const navigate = useNavigation()
  const [keyboardOpen] = useKeyboard()

  // fields' refs
  const nameRef = useRef(null)
  const bdRef = useRef(null)
  const mobileRef = useRef(null)
  const emailRef = useRef(null)
  const countryRef = useRef(null)
  const cityRef = useRef(null)
  const addressRef = useRef(null)

  const [birthDate, setBirthDate] = useState(new Date());
  const [selectedGender, setSelectedGender] = useState<IndexPath | IndexPath[] | any>(new IndexPath(0));
  const [selectedBloodtype, setSelectedBloodtype] = useState<IndexPath | IndexPath[] | any>(new IndexPath(0));

  // autocomplete
  const [value, setValue] = useState('');
  const [insurance, setInsurance] = useState(InsuranceType);

  const displayValue = (selected, list) => list[selected.row];

  const onSelect = (index) => {
    setValue(InsuranceType[index].title);
  };

  const filter = (item, query) => item.title.toLowerCase().includes(query.toLowerCase());

  const onChangeText = (query) => {
    setValue(query);
    setFieldValue('insurance', query);
    setInsurance(insurance.filter(item => filter(item, query)));
  };

  const renderOption = (title, index) => (
    <SelectItem title={title} key={index} />
  );

  const renderAutoCompleteOption = (item, index) => (
    <AutocompleteItem
      key={index}
      title={item.title}
    />
  );

  const calendarBackdropStyle: ViewStyle = { backgroundColor: '#02020290' }
  console.log(accountStore.uid);

  const addUserDetails = async () => {
    const uid = accountStore?.uid ? accountStore?.uid : accountStore.user.user?.uid;
    
    
    const bloodValue = BloodType[selectedBloodtype?.row];
    const genderValue = Gender[selectedGender?.row];

    setFieldValue('birthDate', birthDate);
    setFieldValue('bloodType', bloodValue);
    setFieldValue('gender', genderValue)

    firestore().collection("users")
      .doc(uid)
      .set({ ...values, _id: uid })
      .then(() => {
        dispatch(loginUser({ user: { ...values, id: uid, _id: uid }, uid: uid, loggedIn: true, userType: 'user' }))
      })
      .then((err) => console.log(err))
  }
  const handleSubmitForm = async () => {
    await addUserDetails();
    navigate.navigate("mainStack", { screen: "home" });
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

          <View style={{ marginTop: moderateScale(16), marginBottom: moderateScale(24) }}>
            <Select
              label={'Gender'}
              value={displayValue(selectedGender, Gender)}
              selectedIndex={selectedGender}
              onSelect={index => setSelectedGender(index)}>
              {Gender.map(renderOption)}
            </Select>
          </View>

          <View style={{ marginTop: moderateScale(16), marginBottom: moderateScale(24) }}>
            <Select
              label={'Blood Type'}
              value={displayValue(selectedBloodtype, BloodType)}
              selectedIndex={selectedBloodtype}
              accessoryRight={() => <Blood height={16} width={16} />}
              onSelect={index => setSelectedBloodtype(index)}>
              {BloodType.map(renderOption)}
            </Select>
          </View>

          <View style={{ marginTop: moderateScale(16), marginBottom: moderateScale(24) }}>
            <Datepicker
              label='Birth Date'
              placeholder='Pick your birthdate'
              date={birthDate}
              backdropStyle={calendarBackdropStyle}
              accessoryRight={() => <Calendar height={16} width={16} />}
              onSelect={nextDate => setBirthDate(nextDate)}
            />
          </View>

          <Autocomplete
            label={'Insurance'}
            placeholder='Insurance'
            value={value}
            onSelect={onSelect}
            onChangeText={onChangeText}>
            {insurance.map(renderAutoCompleteOption)}
          </Autocomplete>
          <Text
            style={[fontStyles.subHeadBold, { marginVertical: scaleByDeviceWidth(16) }]}
            textColor={color.palette.black}
          >
            {"Contact"}
          </Text>
          {TextInputField(
            values.mobileNumber,
            handleChange("mobileNumber"),
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
