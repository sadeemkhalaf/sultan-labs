import React from "react"
import { View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { Wallpaper, Screen, Header } from "../../../components"
import { color, spacing } from "../../../theme"
import { foorterNavButton } from "../../../components/footer/footer"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
    backgroundColor: color.transparent,
    paddingHorizontal: spacing[4],
}

export const LabDetailsScreen = observer(function LabDetailsScreen() {
    const navigation = useNavigation();
    return (
        <View testID="LabDetailsScreen" style={FULL}>
            <Wallpaper />
            <Screen style={CONTAINER} preset="scroll" backgroundColor={color.background}>
                <Header onLeftPress={() => navigation.goBack()} leftIcon={'back'} headerText='Lab Details' />
                {foorterNavButton('common.schedule', 'home')}
            </Screen>
        </View>
    )
})
