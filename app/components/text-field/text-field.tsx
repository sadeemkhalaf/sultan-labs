import React, { useState } from "react"
import { StyleProp, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native"
import { color, spacing, typography } from "../../theme"
import { translate, TxKeyPath } from "../../i18n"
import { Text } from "../text/text"
import { moderateScale, verticalScale } from "../../theme/scalingUtil"

// the base styling for the container
const CONTAINER: ViewStyle = {
  paddingBottom: spacing[3],
}

// the base styling for the TextInput
const INPUT: TextStyle = {
  color: color.text,
  fontFamily: typography.primary,
  height: verticalScale(42),
  fontSize: moderateScale(16),
  backgroundColor: color.palette.white,
  borderBottomColor: color.palette.lighterGrey,
  borderBottomWidth: moderateScale(1),
  paddingHorizontal: moderateScale(24),

  // borderRadius: moderateScale(13),

}

const focusedInput: ViewStyle = {
  borderBottomColor: color.palette.orange,
}

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

export interface TextFieldProps extends TextInputProps {
  /**
   * The placeholder i18n key.
   */
  placeholderTx?: TxKeyPath

  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string

  /**
   * The label i18n key.
   */
  labelTx?: TxKeyPath

  /**
   * The label text if no labelTx is provided.
   */
  label?: string

  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: StyleProp<TextStyle>

  /**
   * Various look & feels.
   */
  preset?: keyof typeof PRESETS

  forwardedRef?: any
}

/**
 * A component which has a label and an input together.
 */
export function TextField(props: TextFieldProps) {
  const {
    placeholderTx,
    placeholder,
    labelTx,
    label,
    preset = "default",
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    ...rest
  } = props

  const containerStyles = [CONTAINER, PRESETS[preset], styleOverride]
  const inputStyles = [INPUT, inputStyleOverride]
  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder

  const [focused, setFocused] = useState(false);

  const handleFocus = (current) => {
    setFocused(current);
  }

  return (
    <View style={containerStyles}>
      <Text preset="fieldLabel" style={{marginBottom: moderateScale(8)}} tx={labelTx} text={label} />
      <TextInput
        onFocus={() => handleFocus(true)}
        onBlur={() => handleFocus(false)}
        placeholder={actualPlaceholder}
        placeholderTextColor={color.palette.lighterGrey}
        underlineColorAndroid={color.transparent}
        {...rest}
        style={[inputStyles, focused && {...focusedInput}]}
        ref={forwardedRef}
      />
    </View>
  )
}
