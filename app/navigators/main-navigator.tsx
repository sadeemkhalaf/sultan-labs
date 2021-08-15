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
import { TestDetailsScreen } from "../screens/test-details/test-details-screen"


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

export type AuthParamList = {
  login: undefined
  authOptions: undefined
  signup: undefined
  confirmAccount: undefined
  forgotPassword: undefined
  otp: undefined
}

export type PrimaryParamList = {
  home: undefined
  demo: undefined
  demoList: undefined
  map: undefined
  labDetails: { id?: string }
  testDetails: { id?: string }
  auth: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Auth = createStackNavigator<AuthParamList>()
const Stack = createStackNavigator<PrimaryParamList>()

/*

const Navigator = props => {
const baseHeaderSettings = { ......... }
     
   const mainStack = () => {
        return(
         <Stack.Navigator screenOptions={baseHeaderOptions}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen}/>
         </Stack.Navigator>
      )
   }
const secondStack = () => { //Import the other screens you use!
        return(
         <Stack.Navigator screenOptions={baseHeaderOptions}>
          <Stack.Screen name="Other" component={OtherScreen} />
          <Stack.Screen name="Screens" component={DiffScreen}/>
         </Stack.Navigator>
      )
   }

return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Main" component={mainStack} />
          <Drawer.Screen name="Second" component={secondStack}/>
        </Tabs.Navigator>
      </NavigationContainer>
   )
}

*/

export const AuthStack = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "transparent" },
        cardOverlayEnabled: true,
        cardShadowEnabled: true,
        headerShown: false,
      }}
    >
      <Auth.Screen name="login" component={LoginScreen} />
      <Auth.Screen name="authOptions" component={AuthOptionsScreen} />
      <Auth.Screen name="signup" component={SignUpScreen} />
      <Auth.Screen name="forgotPassword" component={ForgotPasswordScreen} />
      <Auth.Screen name="otp" component={OtpScreen} />
      <Auth.Screen name="confirmAccount" component={ConfirmAccountScreen} />
    </Auth.Navigator>
  )
}

export function MainNavigator() {

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "transparent" },
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="map" component={MapScreen} />
      <Stack.Screen name="testDetails" component={TestDetailsScreen} />
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
