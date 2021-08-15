import React from "react"
import { View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Header, Screen, Wallpaper, Text, Card } from "../../components"
import { color, spacing } from "../../theme"
import { foorterNavButton } from "../../components/footer/footer"
import { styles } from "../auth/login/styles"
import { fontStyles } from "../../theme/fonts"
import { useNavigation } from "@react-navigation/native"

const FULL: ViewStyle = { flex: 1 }
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

export const HomeScreen = observer(function HomeScreen() {

  const navigation = useNavigation();

  return (
    <View testID="HomeScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.background}>
        <Header headerText='What do you want to do?' rightIcon={'heart'} leftIcon={'pin'} onLeftPress={() => navigation.navigate('mainStack', {screen: "map"})}
        onRightPress={() => console.log('on going tests')}/>
        <View style={styles.inputWrapper}>
          {Card('COVID-19', 'get to know more about covid-19 insights')}
          <Text style={fontStyles.subHeadRegular} textColor={color.palette.lightGrey}>{'Tests'}</Text>

          {Card('Test', 'book a test now!', () => {navigation.navigate('mainStack', {screen: 'testDetails'})})}

          {foorterNavButton('common.lab', 'labDetails', LIGHT_BUTTON_STYLE)}

        </View>

        {foorterNavButton('auth.logout', 'login', BUTTON_STYLE)}
      </Screen>
    </View>
  )
})
