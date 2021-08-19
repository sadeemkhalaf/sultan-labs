// import React, { useRef, useState } from "react"
// import { View } from "react-native"
// import { TouchableWithoutFeedback } from "react-native"
// import * as Animatable from "react-native-animatable"
// import { styles } from "../../screens/auth/login/styles"

// const Toggle = () => {

//     const [loginEmail, setLoginEmail] = useState(false);

//   const changeLogin = () => {
//     if (loginEmail) {
//       slideRight()
//     } else {
//       slideLeft()
//     }
//     setLoginEmail(!loginEmail);
//   }

//   const animate;

//   const handleViewRef = useRef(null);

//   const slideRight = () =>
//     this.view.animate({
//       0: {
//         translateX: 0,
//       },
//       0.5: {
//         translateX: 100,
//       },
//       1: {
//         translateX: 150,
//       },
//       2: {
//         translateX: 300,
//       },
//     })

//   const slideLeft = () =>
//     animate({
//       0: {
//         translateX: 100,
//       },
//       0.5: {
//         translateX: -0.3,
//       },
//       1: {
//         translateX: -0.5,
//       },
//       2: {
//         translateX: -1,
//       },
//     })

//   return (
//     <TouchableWithoutFeedback onPress={this.changeLogin}>
//       <View style={styles.buttonRowTop}>
//         <Animatable.View style={styles.buttonSwitch} ref={handleViewRef}></Animatable.View>
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             width: 260,
//             zIndex: 100,
//             marginLeft: -180,
//             marginTop: 5,
//           }}
//         >
//           <Text style={[!loginEmail ? styles.textSwitchActiveLeft : styles.textSwitchLeft]}>
//             Phone
//           </Text>
//           <Text style={[loginEmail ? styles.textSwitchInactive : styles.textSwitch]}>Email</Text>
//         </View>
//       </View>
//     </TouchableWithoutFeedback>
//   )
// }
