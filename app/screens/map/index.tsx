import React, { useCallback, useEffect, useState } from "react"
import { ImageRequireSource, Platform, StyleSheet, Image } from "react-native"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps" // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from "@react-native-community/geolocation"
import { debounce } from "lodash";
import { moderateScale } from "../../theme/scalingUtil"

const pinIcon = require("../../../assets/images/pin.png") as ImageRequireSource

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  pin: {
    height: moderateScale(24),
    left: "50%",
    position: "absolute",
    resizeMode: "center",
    top: "50%",
    width: moderateScale(24),
    zIndex: 5,
  },
})

interface Coordinates {
  latitude: number
  longitude: number
  latitudeDelta?: number
  longitudeDelta?: number
}

// reference: https://juhanajauhiainen.com/posts/make-custom-marker-displaying-users-location-and-direction

const MapsView = () => {
  const [geoLocation, setGeoLocation] = useState<Coordinates>({ longitude: 0, latitude: 0 })
  const debounceSetCoordinates = useCallback(debounce(setGeoLocation, 500), [])
  const mapRef = React.useRef(null);


  useEffect(() => {
    Geolocation.getCurrentPosition((geo) =>
      setGeoLocation({ latitude: geo.coords.latitude, longitude: geo.coords.longitude }),
    )
  }, [])

  return (
    <>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
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
        rotateEnabled={true}
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
