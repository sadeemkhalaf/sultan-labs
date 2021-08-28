import React from "react"
import { presets } from "./wallpaper.presets"
import { WallpaperProps } from "./wallpaper.props"


/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Wallpaper(props: WallpaperProps) {
  // grab the props
  const { preset = "stretch", style: styleOverride } = props

  // assemble the style
  const presetToUse = presets[preset] || presets.stretch
  const styles = [presetToUse, styleOverride]

  // figure out which image to use

  return <></>
}
