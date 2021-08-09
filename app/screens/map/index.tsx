import React, { useCallback, useEffect, useState } from "react"
import { ImageRequireSource, Platform, StyleSheet, Image } from "react-native"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps" // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from "@react-native-community/geolocation"
import { debounce } from "lodash"
import { moderateScale } from "../../theme/scalingUtil"
const pinIcon = require("../../../assets/images/pin.png") as ImageRequireSource

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  pin: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 5,
    height: moderateScale(24),
    width: moderateScale(24),
    resizeMode: "center",
  },
})

interface Coordinates {
  latitude: number
  longitude: number
  latitudeDelta?: number
  longitudeDelta?: number
}

const MapsView = () => {
  const [geoLocation, setGeoLocation] = useState<Coordinates>({ longitude: 0, latitude: 0 })
  const debounceSetCoordinates = useCallback(debounce(setGeoLocation, 500), [])

  useEffect(() => {
    Geolocation.getCurrentPosition((info) =>
      setGeoLocation({ latitude: info.coords.latitude, longitude: info.coords.longitude }),
    )
  }, [])

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        onTouchEnd={(ev) => console.log(ev)}
        initialRegion={{
          latitude: geoLocation.latitude,
          longitude: geoLocation.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        region={{
          latitude: geoLocation.latitude,
          longitude: geoLocation.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onRegionChange={(region) => {
          if (Platform.OS === "ios") {
            debounceSetCoordinates({
              latitude: region.latitude,
              longitude: region.longitude,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            })
          }
        }}
        onRegionChangeComplete={(region) => {
          if (Platform.OS === "android") {
            setGeoLocation({
              latitude: region.latitude,
              longitude: region.longitude,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            })
          }
        }}
        scrollEnabled
        showsUserLocation
        rotateEnabled={false}
        showsIndoorLevelPicker={false}
        userLocationPriority={"high"}
      ></MapView>
      <Image
        source={pinIcon}
        style={[
          styles.pin,
          {
            ...Platform.select({
              android: {
                transform: [{ translateX: -20 }],
              },
              ios: {
                transform: [{ translateX: 5 }],
              },
            }),
          },
        ]}
      />
    </>
  )
}

export default MapsView
