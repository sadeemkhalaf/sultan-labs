/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { ScrollView } from "react-native-gesture-handler"
import { Header, Screen, Text, Card } from "../../components"
import { color, spacing } from "../../theme"
import { footerNavButton } from "../../components/footer/footer"
import { styles } from "../auth/authOptions/login/styles"
import { fontStyles } from "../../theme/fonts"
import { moderateScale, scaleByDeviceWidth, verticalScale } from "../../theme/scalingUtil"

const FULL: ViewStyle = { flexGrow: 1, flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const BUTTON_STYLE: ViewStyle = {
  backgroundColor: color.palette.secondary,
}

const LIGHT_BUTTON_STYLE: ViewStyle = {
  backgroundColor: color.palette.lightGrey,
}

const horizontalView: ViewStyle = {
  display: "flex",
  borderRadius: moderateScale(20),
  backgroundColor: color.palette.white,
  shadowOffset: { width: 3, height: 1 },
  shadowColor: color.palette.lightGrey,
  shadowOpacity: 0.12,
  padding: moderateScale(8),
  justifyContent: "center",
  marginHorizontal: scaleByDeviceWidth(8),
  alignItems: "flex-start",
  height: verticalScale(60),
  width: scaleByDeviceWidth(200),
}

const greetingView: ViewStyle = {
  flexDirection: "row",
  display: "flex",
  marginTop: moderateScale(16),
  alignItems: "center",
  justifyContent: "space-between",
}

// export {greetingView, horizontalView, BUTTON_STYLE, LIGHT_BUTTON_STYLE, CONTAINER, FULL}

export const HomeScreen = observer(function HomeScreen() {
  const navigation = useNavigation()

  return (
    <View testID="HomeScreen" style={FULL}>
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.background}>
        <Header
          rightIcon={"heart"}
          onRightPress={() => console.log("on going tests")}
        />

        {/* Greeting */}
        <View
          style={greetingView}
        >
          <View style={{ flexDirection: "row" }}>
            <Text textColor={color.palette.darkBlue} style={fontStyles.subHeadRegular}>
              {"Welcome, "}
            </Text>
            <Text textColor={color.palette.darkBlue} style={fontStyles.subHeadBold}>
              {"User 1"}
            </Text>
          </View>
          <Text textColor={color.palette.primaryRed} style={fontStyles.bodyBold} onPress={() => navigation.navigate("mainStack", { screen: "map" })}>
            {"Discover Labs"}
          </Text>
        </View>

        <Text
          textColor={color.palette.lightBlue}
          style={[fontStyles.bodyRegular, { marginTop: moderateScale(16) }]}
        >
          {"On-going Tests"}
        </Text>

        {/* horizontal view */}
        <View style={{ flexDirection: "row" }}>
          <ScrollView
            horizontal={true}
            style={{ paddingVertical: moderateScale(8) }}
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={horizontalView}
            >
              <Text textColor={color.palette.darkBlue} style={fontStyles.bodyBold}>
                {"PCR Test"}
              </Text>
              <Text textColor={color.palette.lightBlue} style={fontStyles.bodyRegular}>
                {"test 1"}
              </Text>
            </View>
            <View
              style={horizontalView}
            >
              <Text textColor={color.palette.darkBlue} style={fontStyles.bodyBold}>
                {"PCR Test"}
              </Text>
              <Text textColor={color.palette.lightBlue} style={fontStyles.bodyRegular}>
                {"test 1"}
              </Text>
            </View>
          </ScrollView>
        </View>

        {/* content scroll */}
        <View style={styles.inputWrapper}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[fontStyles.bodyTitleBold, { marginTop: scaleByDeviceWidth(16) }]} textColor={color.palette.black}>{'Services'}</Text>
            {Card("Test A", "get to know more about Test-A insights", color.palette.underLineFieldBorder, color.palette.black)}

            <Text style={[fontStyles.bodyTitleBold, { marginTop: scaleByDeviceWidth(16) }]} textColor={color.palette.black}>{'COVID-19'}</Text>
            {Card("COVID-19", "get to know more about covid-19 insights", color.palette.lightRed)}

            <Text
              style={[fontStyles.bodyTitleBold, { marginTop: moderateScale(8) }]}
              textColor={color.palette.darkBlue}
            >
              {"Most Viewd Tests"}
            </Text>

            {Card("Test C", "get to know more about Test-C insights", color.palette.underLineFieldBorder, color.palette.black)}

            {Card("Test B", "get to know more about Test-B insights", color.palette.underLineFieldBorder, color.palette.black)}

            {footerNavButton("auth.logout", "authOptions", BUTTON_STYLE)}
          </ScrollView>
        </View>
      </Screen>
    </View>
  )
})
