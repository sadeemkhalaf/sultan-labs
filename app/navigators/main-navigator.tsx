/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { HomeScreen, MapScreen } from "../screens"
import { LoginScreen, SignUpScreen, ForgotPasswordScreen, OtpScreen, ConfirmAccountScreen, AuthOptionsScreen } from "../screens/auth"
import { LabDetailsScreen } from "../screens/lab/lab-details"


/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
  home: undefined
  demo: undefined
  demoList: undefined
  login: undefined
  authOptions: undefined
  signup: undefined
  confirmAccount: undefined
  forgotPassword: undefined
  otp: undefined
  map: undefined
  labDetails: {id?: string}
  testDetails: {id?: string}
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>()

export function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "transparent" },
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="authOptions" component={AuthOptionsScreen} />
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="map" component={MapScreen} />
      <Stack.Screen name="testDetails" component={HomeScreen} />
      <Stack.Screen name="signup" component={SignUpScreen} />
      <Stack.Screen name="forgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="otp" component={OtpScreen} />
      <Stack.Screen name="confirmAccount" component={ConfirmAccountScreen} />
      <Stack.Screen name="labDetails" component={LabDetailsScreen} />
    </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["home"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
