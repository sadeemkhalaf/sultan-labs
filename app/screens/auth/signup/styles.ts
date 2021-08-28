import { StyleSheet } from "react-native"
import { moderateScale } from "../../../theme/scalingUtil"

const styles = StyleSheet.create({
  inputWrapper: {
    flex: 1,
    flexGrow: 1,
    paddingBottom: moderateScale(56),
    marginBottom: moderateScale(16)
  },
})

export { styles }
